import { ControlState, EventSubscribers } from "dev-classes";

import type { BitratesDataItem, ModernControlBitrateState, NetworkQuality_OR, WebRTCStats } from "./ModernControlBitrate.types";
// RTCRtpSender = Ваш отправитель (вы отправляете данные)
// RTCRtpReceiver = Ваш получатель (вы получаете данные)
// remote-inbound-rtp = Удаленная сторона сообщает о получении ваших данных
// remote-outbound-rtp = Удаленная сторона сообщает о своих отправленных данных (вы их получаете)
const defaultBitrates = {
  audio: 128,
  video: 1000,
  screen: 2000, //качество при демонстрации экрана
  data: 500,
};
const defaultState: ModernControlBitrateState = {
  ...defaultBitrates,
  isScreenSharing: false,
  bitrates: [defaultBitrates],
  lastQuality: "critical",
  lastPacketLoss: 0,
  timeoutWatcher: 5000,
};

interface BitratesSaveInfo {
  videoBitrate: number;
  audioBitrate: number;
  lastVideoBytes: number | null;
  lastVideoTimestamp: number | null;
  lastAudioBytes: number | null;
  lastAudioTimestamp: number | null;
}
export class ModernControlBitrate {
  private networkMonitorInterval: NodeJS.Timeout | null = null;
  private controlState = new ControlState<ModernControlBitrateState>(defaultState);

  private timeoutWatcher = 5000;

  private remoteSaveBitrateInfo: BitratesSaveInfo = {
    videoBitrate: 0,
    audioBitrate: 0,
    lastVideoBytes: null,
    lastVideoTimestamp: null,
    lastAudioBytes: null,
    lastAudioTimestamp: null,
  };
  private localSaveBitrateInfo:Omit<BitratesSaveInfo, "lastAudioBytes" | "lastAudioTimestamp"> = {
    videoBitrate: 0,
    audioBitrate: 0,
    lastVideoBytes: null,
    lastVideoTimestamp: null,
  };

  private setSaveParamsLocal(params: Partial<Omit<BitratesSaveInfo, "lastAudioBytes" | "lastAudioTimestamp">>) {
    this.localSaveBitrateInfo = {
      ...this.localSaveBitrateInfo,
      ...params,
    };
  }
  private setSaveParamsRemote(params: Partial<BitratesSaveInfo>) {
    this.remoteSaveBitrateInfo = {
      ...this.remoteSaveBitrateInfo,
      ...params,
    };
  }
  events = new EventSubscribers<{ bitrateChanged: (data: WebRTCStats) => void }>(["bitrateChanged"]);

  constructor(timeoutWatcher: number = 5000) {
    this.timeoutWatcher = timeoutWatcher;
  }
  on = this.events.subscribe;
  off = this.events.unsubscribe;

  private getPacketLossStatus(packetLoss: number): NetworkQuality_OR {
    if (packetLoss > 10) return "critical";
    if (packetLoss > 5) return "poor";
    if (packetLoss > 2) return "good";
    return "excellent";
  }

  private async getControlsStatsStreams(pc: RTCPeerConnection) {
    const stats = await pc.getStats();
    const statsArray = [...stats.values()];
    const outboundVideo: RTCOutboundRtpStreamStats = statsArray.find((s) => s.type === "outbound-rtp" && s.kind === "video");
    const outboundAudio: RTCOutboundRtpStreamStats = statsArray.find((s) => s.type === "outbound-rtp" && s.kind === "audio");
    const inboundVideo: RTCInboundRtpStreamStats = statsArray.find((s) => s.type === "inbound-rtp" && s.kind === "video");
    const inboundAudio: RTCInboundRtpStreamStats = statsArray.find((s) => s.type === "inbound-rtp" && s.kind === "audio");
    const remoteInbound: RTCInboundRtpStreamStats = statsArray.find((s) => s.type === "remote-inbound-rtp" && s.ssrc === outboundVideo?.ssrc);
    const remoteOutbound: RTCOutboundRtpStreamStats = statsArray.find((s) => s.type === "remote-outbound-rtp" && s.ssrc === inboundVideo?.ssrc);
    const transport: RTCTransportStats = statsArray.find((s) => s.type === "transport");
    const candidatePair: RTCIceCandidatePairStats = statsArray.find((s) => s.type === "candidate-pair" && s.nominated);

    // Кодеки
    const outboundVideoCodec: RTCRtpCodecParameters = statsArray.find((s) => s.type === "codec" && s.id === outboundVideo?.codecId);
    const inboundVideoCodec: RTCRtpCodecParameters = statsArray.find((s) => s.type === "codec" && s.id === inboundVideo?.codecId);

    return { outboundVideo, outboundAudio, inboundVideo, inboundAudio, remoteInbound, remoteOutbound, transport, candidatePair, outboundVideoCodec, inboundVideoCodec };
  }

  private calculateBitrate(
    currentBytes: number | undefined,
    lastBytes: number | null,
    lastTime: number | null,
    targetBitrate?: number,
  ): { currentBitrate: number; newLastBytes: number | null; newLastTime: number | null } {
    let currentBitrate = 0;
    let newLastBytes = lastBytes;
    let newLastTime = lastTime;

    if (!currentBytes) {
      return { currentBitrate, newLastBytes, newLastTime };
    }

    const now = Date.now();

    if (lastBytes !== null && lastTime !== null) {
      const timeDiffSec = (now - lastTime) / 1000;
      const bytesDiff = currentBytes - lastBytes;

      if (timeDiffSec > 0.1 && bytesDiff > 0) {
        currentBitrate = (bytesDiff * 8) / timeDiffSec / 1000;
      } else if (targetBitrate) {
        currentBitrate = targetBitrate / 1000;
      }
    } else if (targetBitrate) {
      currentBitrate = targetBitrate / 1000;
    }

    newLastBytes = currentBytes;
    newLastTime = now;

    return { currentBitrate, newLastBytes, newLastTime };
  }

  private getLocalStats({
    outboundVideo,
    outboundAudio,
    outboundVideoCodec,
  }: {
    outboundVideo: RTCOutboundRtpStreamStats;
    outboundAudio: RTCOutboundRtpStreamStats;
    outboundVideoCodec: RTCRtpCodecParameters;
  }): WebRTCStats["local"] {
    const { lastVideoBytes, lastVideoTimestamp } = this.localSaveBitrateInfo;
    //INFO: outboundVideo появляеться когда отрабатывает pc.setLocalDescription при обмене offer answer
    const videoCalculateBitrate = this.calculateBitrate(outboundVideo?.bytesSent, lastVideoBytes, lastVideoTimestamp, outboundVideo?.targetBitrate);
    this.setSaveParamsLocal( {
      lastVideoBytes: videoCalculateBitrate.newLastBytes,
      lastVideoTimestamp: videoCalculateBitrate.newLastTime,
    });
    const currentVideoBitrate = Math.max(0, Math.round(videoCalculateBitrate.currentBitrate));
    const currentAudioBitrate = outboundAudio?.targetBitrate ? outboundAudio.targetBitrate / 1000 : 64;

    return {
      frameWidth: outboundVideo?.frameWidth || 0,
      frameHeight: outboundVideo?.frameHeight || 0,
      framesSent: outboundVideo?.framesSent || 0,
      keyFramesEncoded: outboundVideo?.keyFramesEncoded || 0, //Количество ключевых кадров

      bitrate: outboundVideo?.targetBitrate || 0, //Общее количество отправленных байт
      videoBitrate: this.formatBitrate(currentVideoBitrate),
      audioBitrate: this.formatBitrate(currentAudioBitrate),
      fps: outboundVideo?.framesPerSecond || 0,
      bytesSent: outboundVideo?.bytesSent || 0,
      packetsSent: outboundVideo?.packetsSent || 0, // Пакеты, которые отправлены

      codec: outboundVideoCodec?.mimeType?.split("/")[1] || "unknown",

      ssrc: outboundVideo?.ssrc || 0, //идентификатор потока
      nackCount: outboundVideo?.nackCount || 0, //Количество запросов на повторную отправку потерянных пакетов 0-100 (чем выше, тем хуже)
      pliCount: outboundVideo?.pliCount || 0, //Количество запросов на отправку ключевого кадра (Picture Loss Indication)
      // @ts-ignore
      qualityLimitationReason: outboundVideo?.qualityLimitationReason || "none",
      // encoderImplementation: outboundVideo?.encoderImplementation ?? "unknown",
    };
  }
  formatDecodeTime = (seconds: number): string => {
    const ms = seconds * 1000;
    if (ms < 1000) return `${Math.round(ms)} мс`;
    return `${(ms / 1000).toFixed(1)} сек`;
  };

  private formatBitrate = (bitrateKbps: number): string => {
    if (bitrateKbps >= 1000) {
      return `${(bitrateKbps / 1000).toFixed(1)} Мбит/с`;
    }
    return `${Math.round(bitrateKbps)} Кбит/с`;
  };

  private getRemoteStats({
    inboundVideo,
    inboundAudio,
    inboundVideoCodec,
  }: {
    inboundVideo: RTCInboundRtpStreamStats;
    inboundAudio: RTCInboundRtpStreamStats;
    inboundVideoCodec: RTCRtpCodecParameters;
  }): WebRTCStats["remote"] {
    //INFO: inboundVideo появляеться когда отрабатывает pc.setLocalDescription при обмене offer answer
    const packetsLost = inboundVideo?.packetsLost || 0;
    const packetsReceived = inboundVideo?.packetsReceived || 0;
    const totalPackets = packetsReceived + packetsLost;
    const packetLossPercent = totalPackets > 0 ? (packetsLost / totalPackets) * 100 : 0;
    const networkQuality = this.getPacketLossStatus(packetLossPercent);

    const { lastVideoBytes, lastVideoTimestamp, lastAudioBytes, lastAudioTimestamp, audioBitrate, videoBitrate } = this.remoteSaveBitrateInfo;
    // debugger

    const videoCalculateBitrate = this.calculateBitrate(inboundVideo?.bytesReceived, lastVideoBytes, lastVideoTimestamp);
    const audioCalculateBitrate = this.calculateBitrate(inboundAudio?.bytesReceived, lastAudioBytes, lastAudioTimestamp);

    const currentVideoBitrate = !videoCalculateBitrate.currentBitrate ? videoBitrate : Math.max(0, Math.round(videoCalculateBitrate.currentBitrate));
    const currentAudioBitrate = !audioCalculateBitrate.currentBitrate ? audioBitrate : Math.max(0, Math.round(audioCalculateBitrate.currentBitrate));

    this.setSaveParamsRemote({
      lastVideoBytes: videoCalculateBitrate.newLastBytes,
      lastVideoTimestamp: videoCalculateBitrate.newLastTime,
      lastAudioBytes: audioCalculateBitrate.newLastBytes,
      lastAudioTimestamp: audioCalculateBitrate.newLastTime,
      videoBitrate: currentVideoBitrate,
      audioBitrate: currentAudioBitrate,
    });

    const result = {
      frameWidth: inboundVideo?.frameWidth || 0,
      frameHeight: inboundVideo?.frameHeight || 0,
      framesReceived: inboundVideo?.framesReceived || 0, // всего получено кадров "аналог framesSent"
      framesDropped: inboundVideo?.framesDropped || 0, // сколько пропущено/потеряно
      framesDecoded: inboundVideo?.framesDecoded || 0, // сколько декодировано

      videoBitrate: this.formatBitrate(currentVideoBitrate),
      audioBitrate: this.formatBitrate(currentAudioBitrate),
      fps: inboundVideo?.framesPerSecond || 0,
      packetsReceived, // Пакеты, которые успешно дошли до получателя
      packetsLost, // Пакеты, которые потерялись в сети и не дошли до получателя
      totalPackets, // Всего пакетов, которые должны были быть отправлены
      packetLossPercent, // Какой процент пакетов потерялся

      jitter: inboundVideo?.jitter ? inboundVideo.jitter * 1000 : 0, // мс
      networkQuality,
      // Сложность декодирования
      totalDecodeTime: this.formatDecodeTime(inboundVideo?.totalDecodeTime || 0), // общее время декодирования
      totalProcessingDelay: this.formatDecodeTime(inboundVideo?.totalProcessingDelay || 0), // задержка обработки
      codec: inboundVideoCodec?.mimeType?.split("/")[1],
      jitterBufferDelay: inboundVideo?.jitterBufferDelay || 0, //задержка в буфере джиттера
      ssrc: inboundVideo?.ssrc || 0, //идентификатор потока
      decoderImplementation: inboundVideo?.decoderImplementation || "unknown", //используемый декодер
    };

    return result;
  }

  private async getAllStats(pc: RTCPeerConnection): Promise<WebRTCStats> {
    const controlsStatsStreams = await this.getControlsStatsStreams(pc);
    const local = this.getLocalStats(controlsStatsStreams);
    const remote = this.getRemoteStats(controlsStatsStreams);
    // const transport = this.getTransportStats(controlsStatsStreams);
    return {
      local,
      remote,
    };
  }

  private startWatcher(cb: () => void) {
    if (this.networkMonitorInterval) {
      clearInterval(this.networkMonitorInterval);
    }
    this.networkMonitorInterval = setInterval(async () => {
      cb();
    }, this.timeoutWatcher);
  }

  setBitratesList(bitrates: ModernControlBitrateState["bitrates"]) {
    this.controlState.setState({ bitrates });
  }
  private getMaxBitrate = () => {
    const { bitrates } = this.controlState.getState();
    const maxBitrateVideo = [...bitrates].sort((a, b) => b.video - a.video)[0].video;
    const maxBitrateAudio = [...bitrates].sort((a, b) => b.audio - a.audio)[0].audio;

    return { maxBitrateVideo, maxBitrateAudio };
  };
  //INFO: Автоматическая подстройка битрейта по заданаму максимальному значению в списке
  private async autoAdjustBitrate(pc: RTCPeerConnection, networkQuality: NetworkQuality_OR, packetLoss: number) {
    const { video: videoBitrate, audio: audioBitrate } = this.controlState.getState();
    let bitratesSave = { video: videoBitrate, audio: audioBitrate };
    const { maxBitrateVideo, maxBitrateAudio } = this.getMaxBitrate();
    switch (networkQuality) {
      case "excellent":
        if (videoBitrate < maxBitrateVideo) {
          bitratesSave = { video: Math.min(maxBitrateVideo, videoBitrate + 300), audio: maxBitrateAudio };
        }
        break;
      case "good":
        if (packetLoss > 3) {
          bitratesSave = { video: Math.max(800, videoBitrate - 100), audio: 128 };
        } else if (videoBitrate < 1000) {
          bitratesSave = { video: 1000, audio: 128 };
        }
        break;

      case "poor":
        bitratesSave = { video: Math.max(400, videoBitrate - 250), audio: 64 };
        break;
      case "critical":
        bitratesSave = { video: 250, audio: 32 };
        break;
    }

    if (bitratesSave.video !== videoBitrate) {
      await this.setBitrate("video", pc, bitratesSave.video);
      await this.setBitrate("audio", pc, bitratesSave.audio);
    }
    await this.sendDataStats(pc);
  }

  //INFO: АВТОМАТИЧЕСКАЯ АДАПТАЦИЯ под качество сети
  async startAdaptiveBitrate(pc: RTCPeerConnection, mode: "active" | "passive") {
    if (!pc) {
      console.error("No PC provided");
      return;
    }
    const { maxBitrateVideo, maxBitrateAudio } = this.getMaxBitrate();
    await this.setBitrate("video", pc, maxBitrateVideo);
    await this.setBitrate("audio", pc, maxBitrateAudio);
    this.sendDataStats(pc);

    this.startWatcher(async () => {
      if (!pc) return;
      const { remote } = await this.getAllStats(pc);
      if (mode == "active") {
        await this.autoAdjustBitrate(pc, remote.networkQuality, remote.packetsLost);
        return;
      }
      if (mode == "passive") {
        const { lastPacketLoss, lastQuality } = this.controlState.getState();
        if (remote.networkQuality !== lastQuality || Math.abs(remote.packetsLost - lastPacketLoss) > 1) {
          await this.autoAdjustBitrate(pc, remote.networkQuality, remote.packetsLost);
        }
      }
    });
  }

  stopAdaptiveBitrate() {
    if (this.networkMonitorInterval) {
      clearInterval(this.networkMonitorInterval);
      this.networkMonitorInterval = null;
      console.log("Adaptive bitrate monitoring stopped");
    }
  }
  // Ручное управление (например, пользователь выбрал качество)
  async setManualQuality(pc: RTCPeerConnection, bitrate: BitratesDataItem) {
    await this.setBitrate("video", pc, bitrate.video);
    await this.setBitrate("audio", pc, bitrate.audio);
    this.sendDataStats(pc);
    this.startWatcher(async () => {
      if (!pc) return;
      await this.sendDataStats(pc);
    });
  }

  private async sendDataStats(pc: RTCPeerConnection) {
    const stats = await this.getAllStats(pc);

    this.controlState.setState({
      lastQuality: stats.remote.networkQuality,
      lastPacketLoss: stats.remote.packetsLost,
    });
    this.events.publish("bitrateChanged", stats);
  }
  destroy() {
    this.stopAdaptiveBitrate();
    this.controlState.resetState();
    this.events.resetSubscribers();
  }
  async setBitrate(nameTrack: "video" | "audio", pc: RTCPeerConnection, bitrateKbps: number | null) {
    try {
      const sender = pc.getSenders().find((s) => s.track?.kind === nameTrack);
      if (!sender) throw new Error(`Sender for ${nameTrack} not found`);

      const params = sender.getParameters();
      if (!params.encodings || params.encodings.length === 0) {
        params.encodings = [{}];
      }

      // Поддержка unlimited
      if (bitrateKbps === null || bitrateKbps === 0) {
        delete params.encodings[0].maxBitrate;
        console.log(`♾️ ${nameTrack} bitrate unlimited`);
      } else {
        params.encodings[0].maxBitrate = bitrateKbps * 1000;
        console.log(`🎯 ${nameTrack} bitrate set to ${bitrateKbps} kbps`);
      }

      await sender.setParameters(params);
      this.controlState.setState({ [nameTrack]: bitrateKbps || 0 });
      return true;
    } catch (error) {
      console.error(`Failed to set ${nameTrack} bitrate:`, error);
      return error;
    }
  }
}
