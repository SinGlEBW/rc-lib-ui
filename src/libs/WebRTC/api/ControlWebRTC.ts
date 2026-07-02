import { ControlState, EventSubscribers } from "dev-classes";
import { ChannelsRTC } from "./ChannelsRTC";
import type { ControlWebRTC_Events, DefaultStateProps, InitPeerConnectionPayload } from "./ControlWebRTC.types";
import { ModernControlBitrate } from "./ModernControlBitrate";


const defaultState: DefaultStateProps = {
  pc: null,
  localStream: null,
  activeUpdateOffer: false,
  isPlayLocalVideo: false,
  iceRestart: false,
  isInitEvents: false,
};

export class ControlWebRTC {
  static controlComponent = {};
  private static msgErr = "функция не может быть использована без предварительной инициализации initPC";

  static events = new EventSubscribers<ControlWebRTC_Events>(["pc", "offer", "candidate", "remoteTracks", "onStopingStart", "iceConnection", "localStream"]);
  private static restartTimeout: NodeJS.Timeout | null = null;
  private static controlState = new ControlState<DefaultStateProps>(defaultState);
  static channels = new ChannelsRTC(ControlWebRTC.events);
  static controlBitrate = new ModernControlBitrate(1000);
  static getPeerConnection() {
    return ControlWebRTC.controlState.getState().pc;
  }

  private static getArrayKeyAndWatchEvents = () =>
    Object.entries({
      negotiationneeded: ControlWebRTC.watchEventNegotiationneeded,
      track: ControlWebRTC.watchEventTrack,
      icecandidate: ControlWebRTC.watchEventCandidate,
      icecandidateerror: ControlWebRTC.watchEventCandidateError,

      signalingstatechange: ControlWebRTC.watchEventSignalingstatechange,
      icegatheringstatechange: ControlWebRTC.watchEventIcegatheringstatechange,
      iceconnectionstatechange: ControlWebRTC.watchEventIceconnectionstatechange,
    });

  static on = ControlWebRTC.events.subscribe;
  static off = ControlWebRTC.events.unsubscribe;
  static getLocalStream = () => ControlWebRTC.controlState.getState().localStream;

  static requestStream = async (typeStream: "displayMedia" | "userMedia" = "userMedia", constraints: DisplayMediaStreamOptions, config?: { onStopingStart?: () => void }) => {
    await ControlWebRTC.stopTrack(config?.onStopingStart);
    const promiseGetMedia = typeStream === "userMedia" ? window.navigator?.mediaDevices?.getUserMedia(constraints) : window.navigator?.mediaDevices?.getDisplayMedia(constraints);
    let localStream: MediaStream | null = null;

    if (promiseGetMedia) {
      localStream = await promiseGetMedia;
      ControlWebRTC.controlState.setState({ localStream });
      ControlWebRTC.events.publish("localStream", localStream);
    }
    return localStream;
  };

  static sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  static async stopTrack(onStopingStart?: () => void) {
    const localStream = ControlWebRTC.getLocalStream();
    if (localStream) {
      onStopingStart && onStopingStart();
      ControlWebRTC.events.publish("onStopingStart");
      //Сделано что быкорректно отработал Preloader. Требуеться использовать visibility для video + Preloader
      await ControlWebRTC.sleep(10);
      localStream.getTracks().forEach((track) => {
        track.stop();
        localStream.removeTrack(track);
      });
    }
    await ControlWebRTC.sleep(50);
  }

  /*#############----------<{ Основной функционал }>-----------#############*/
  static async initPeerConnection({ configuration }: InitPeerConnectionPayload) {
    const state = ControlWebRTC.controlState.getState();
    if (state.pc) {
      await ControlWebRTC.destroy();
    }
    const pc = new RTCPeerConnection(configuration);
    ControlWebRTC.controlState.setState({ pc });
    ControlWebRTC.peerConnectionsEvents("add", pc).then(() => {});
    ControlWebRTC.events.publish("pc", pc);

    // const senders = pc.getSenders(); //Массив треков
    // const receiv = pc.getReceivers(); //массив треков
  }

  static addIceCandidate({ candidate }: { candidate: RTCIceCandidateInit | RTCIceCandidate }) {
    ControlWebRTC.getPeerConnection()?.addIceCandidate(candidate);
  }

  static close() {
    const pc = ControlWebRTC.getPeerConnection();
    if (!pc) {
      console.log(ControlWebRTC.msgErr);
      return;
    }
    const states = ["closed", "disconnected", "failed"];
    if (states.includes(pc.connectionState)) {
      console.log(`PeerConnection already in state: ${pc.connectionState}`);
      return;
    }

    ControlWebRTC.stopTrack();
    const senders = pc.getSenders();
    senders.forEach((sender) => sender?.track?.stop());
    pc.close(); //автоматически очистит все senders/receivers
  }

  // static setBitrates = BandWidthHandler.controlState.setState;
  // static getBitrates = BandWidthHandler.controlState.getState;

  /*#############----------<{ Слушатели ивентов }>-----------#############*/

  private static watchEventNegotiationneeded(e) {
    console.log("Ивент: negotiationneeded: ", e);
    // const { activeUpdateOffer, pc } = ControlWebRTC.controlState.getState();
    // neotiationNeededCount > 0 && ControlWebRTC.startCreateOffer();

    // if (pc.iceConnectionState === "failed") {
    //   pc.restartIce();
    // }
  }

  private static watchEventCandidate(e) {
    if (e.candidate) {
      ControlWebRTC.events.publish("candidate", { type: "candidate", candidate: e.candidate });
    }
  }
  private static watchEventCandidateError(e) {
    console.log(`>>>>>>>icecandidateError. ErrorCode: ${e.errorCode}, errorText: ${e.errorText}<<<<<<<`, e);
    const pc = ControlWebRTC.getPeerConnection();
    if (e.errorCode === 701) {
      console.log("TURN server недоступен, добавьте дополнительные сервера...");
      // pc.restartIce();// Если много TURN серверов в списке iceServers, то может пробовать переподключаться
    }
  }

  private static watchEventTrack(e) {
    ControlWebRTC.events.publish("remoteTracks", e);
  }

  private static watchEventSignalingstatechange(e) {
    console.log("Статус: signalingState > ", e.target.signalingState);
    switch (e.target.signalingState) {
      case "have-local-offer":
        console.log("signalingState: (have-local-offer): offer добавлен в setLocalDescription");
        break;
      case "stable":
        console.log("signalingState: (stable): ICE переговоры завершены");
        ControlWebRTC.controlState.setState({ iceRestart: true });
        break;
    }
  }

  private static watchEventIcegatheringstatechange(e) {
    console.log("Статус: iceGatheringState > ", e.target.iceGatheringState);
    switch (e.target.iceGatheringState) {
      case "new":
        console.log("iceGatheringState: (new) Подготовка к сбору");
        break;
      case "gathering":
        console.log("iceGatheringState: (gathering)  Начался сбор кандидатов");
        break;
      case "complete":
        console.log("iceGatheringState: (complete)  Сбор кандидатов закончен");
        break;
    }
  }

  private static watchEventIceconnectionstatechange(e) {
    console.log("Статус: iceConnectionState > ", e.target.iceConnectionState);

    const pc = e.target as RTCPeerConnection;
    const state = pc.iceConnectionState;

    /*
      failed | disconnected - автоматический способ востановления соединения когда уже проблема случилась
      handleNetworkChange метод ручного востановления failed | disconnected
    */
    ControlWebRTC.events.publish("iceConnection", state);
    switch (state) {
      case "failed":
        console.log("ICE соединение провалилось, пытаемся перезапустить...");
        ControlWebRTC.restartIce();
        break;

      case "disconnected":
        console.log("ICE соединение потеряно, ожидаем восстановления...");
        // Даем небольшую задержку перед перезапуском
        if (ControlWebRTC.restartTimeout) {
          clearTimeout(ControlWebRTC.restartTimeout);
        }
        ControlWebRTC.restartTimeout = setTimeout(() => {
          if (pc.iceConnectionState === "disconnected") {
            console.log("Соединение не восстановилось, перезапускаем ICE");
            ControlWebRTC.restartIce();
          }
        }, 3000);
        break;

      case "connected":
      case "completed":
        console.log("ICE соединение установлено");
        console.log("pc.getSenders", pc.getSenders());
        console.log("pc.getReceivers", pc.getReceivers());

        if (ControlWebRTC.restartTimeout) {
          clearTimeout(ControlWebRTC.restartTimeout);
        }
        break;
    }
  }

  /*--------------------------------------------------------------------------------------------------------------------------*/
  /*--------------------------------------------------------------------------------------------------------------------------*/
  static isIceRestart(sdp: string) {
    return sdp.includes("ice-ufrag");
  }

  static startCreateOffer() {
    const { iceRestart } = ControlWebRTC.controlState.getState();
    const pc = ControlWebRTC.getPeerConnection();
    if (!pc) return;
    console.log("##########--------<{ Создание offer }>---------##########");

    const options = { offerToReceiveAudio: true, offerToReceiveVideo: true, iceRestart };
    pc.createOffer(options).then(({ type, sdp }) => {
      pc.setLocalDescription({ type, sdp }).then(() => {
        ControlWebRTC.events.publish("offer", { type: "offer", sdp: sdp! });
      });
    });
  }

  /*#############----------<{ Helpers }>-----------#############*/

  private static async peerConnectionsEvents(status: "add" | "remove", pc: RTCPeerConnection) {
    // console.log(`##########--------<{ ${status === "add" ? "Создаём" : "Удаляем"} пачку ивентов peerConnection }>---------#########`);
    const entriesEvents = ControlWebRTC.getArrayKeyAndWatchEvents();
    for (const [keyEvent, watchEvent] of entriesEvents) {
      status === "add" ? pc.addEventListener(keyEvent, watchEvent) : pc.removeEventListener(keyEvent, watchEvent);
    }
    status === "add" ? ControlWebRTC.controlState.setState({ isInitEvents: true }) : ControlWebRTC.controlState.setState({ isInitEvents: false });
    return "";
  }

  static setTrackInPeerConnection({ localStream }: { localStream: MediaStream }) {
    const { pc } = ControlWebRTC.controlState.getState();
    localStream.getTracks().forEach((track) => {
      pc?.addTrack(track, localStream); //Создает RTCRtpSender который нужно не забывать чистить в getSenders
      // if (track.kind === "video") {
      //   ControlWebRTC.events.publish("loadLocalVideo", undefined);
      // }
    });
  }

  static async updateConstraintsMediaStream({ newLocalStream }: { newLocalStream: MediaStream }) {
    try {
      ControlWebRTC.controlState.setState({ activeUpdateOffer: true });
      //По новой создаём т.к. applyConstraints не всегда работает
      const newTracks = newLocalStream.getTracks();
      const pc = ControlWebRTC.getPeerConnection();
      if (!pc) return;
      const senders = pc.getSenders();

      for (const newTrack of newTracks) {
        const sender = senders.find((s) => s.track?.kind === newTrack.kind);
        if (sender) {
          await sender.replaceTrack(newTrack);
          console.log(`Трек ${newTrack.kind} заменен`);
        } else {
          pc?.addTrack(newTrack, newLocalStream);
          console.log(`Добавлен новый трек ${newTrack.kind}`);
        }
      }

      return;
    } catch (error) {
      console.error("Ошибка при обновлении медиа-потока:", error);
      throw error;
    }
  }

  static destroy() {
    return new Promise((resolve) => {
      const pc = ControlWebRTC.getPeerConnection();
      const { isInitEvents, localStream } = ControlWebRTC.controlState.getState();
      this.controlBitrate.destroy();
      if (!pc) {
        resolve(null);
        return;
      }
      if (localStream) {
        ControlWebRTC.close();
      }
      if (isInitEvents) {
        ControlWebRTC.peerConnectionsEvents("remove", pc).then(() => {
          ControlWebRTC.controlState.resetState();
          resolve(null);
          // ControlWebRTC.events.resetSubscribers();
        });
      } else {
        ControlWebRTC.controlState.resetState();
        resolve(null);
      }
      if (ControlWebRTC.restartTimeout) {
        clearTimeout(ControlWebRTC.restartTimeout);
        ControlWebRTC.restartTimeout = null;
      }
    });
  }

  static handleNetworkChange() {
    console.log("Обнаружено изменение сети, инициируем перезапуск ICE");
    const pc = ControlWebRTC.getPeerConnection();

    if (!pc) {
      console.log("PeerConnection не инициализирован");
      return;
    }
    ControlWebRTC.restartIce();
  }

  private static restartIce() {
    const pc = ControlWebRTC.getPeerConnection();
    if (!pc) return;
    console.log("Перезапуск ICE...");
    try {
      if (pc.restartIce) {
        pc.restartIce();
        console.log("ICE перезапущен через restartIce()");
      }
    } catch (error) {
      console.error("Ошибка при перезапуске ICE:", error);
    }
  }

  //Для динамической смены ise серверов
  private static updateIceServers(newIceServers) {
    const pc = ControlWebRTC.getPeerConnection();
    if (!pc) return;
    try {
      const currentConfig = pc.getConfiguration();
      pc.setConfiguration({
        ...currentConfig,
        iceServers: newIceServers,
      });
      ControlWebRTC.restartIce();
      console.log("ICE серверы обновлены:", newIceServers);
    } catch (error) {
      console.error("Ошибка при обновлении ICE серверов:", error);
    }
  }

  static playVideo = ({ videoEl, stream, onPlay }: { videoEl: HTMLVideoElement; stream: MediaStream; onPlay?: () => void }) => {
    if (videoEl.srcObject) {
      videoEl.srcObject = null;
    }
    videoEl.srcObject = stream;
    videoEl.load();
    const timeId = setTimeout(function () {
      videoEl.play();
      clearTimeout(timeId);
      const state = ControlWebRTC.controlState.getState();
      onPlay && onPlay();
    }, 200);
  };
}


//INFO: negotiationneeded отрабатывает на addTrack removeTrack addTransceiver
/*
    Отрабатывает при:
      Впервые добавляете треки в RTCPeerConnection через addTrack() или addTransceiver()
      Добавление нового трека - при вызове addTrack() с новым треком
      Удаление трека - при вызове removeTrack(), который сигнализирует о прекращении отправки медиа
      Модификация параметров RTCRtpSender (например, изменение кодека, FEC, масштабирования разрешения)
      Изменение направления трансмиттера (sendonly/recvonly/sendrecv)
      Добавление нового RTCDataChannel
      Изменение параметров существующего канала
      Вызов restartIce() - принудительно вызывает negotiationneeded
      Ситуации, когда ICE-соединение переходит в состояние failed с последующим запросом перезапуска
  */
