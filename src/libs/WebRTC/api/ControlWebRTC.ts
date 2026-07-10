import { ControlState, EventSubscribers, Utils, DelaysPromise } from "dev-classes";
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
  iceRestartInProgress: false,
  totalNumberOfRepit: 0,
  numberOfRepit: 10,
  timeReConnect: 2000,
  isInitiator: false,
  previousRemoteUfrag: null,
  previousRemotePwd: null,
};

export class ControlWebRTC {
  static controlComponent = {};
  private static msgErr = "функция не может быть использована без предварительной инициализации initPC";
  private static controlDelay = new DelaysPromise();
  static events = new EventSubscribers<ControlWebRTC_Events>(["pc", "offer", "candidate", "remoteTracks", "stopingStart", "iceConnection", "localStream", "remoteRestart", "timeoutDisconnected"]);
  private static restartTimeout: NodeJS.Timeout | null = null;
  private static controlState = new ControlState<DefaultStateProps>(defaultState);
  static channels = new ChannelsRTC(ControlWebRTC.events);
  static controlBitrate = new ModernControlBitrate(1000);
  static getPeerConnection() {
    return ControlWebRTC.controlState.getState().pc;
  }
  static setInitiatorRole(isInitiator: boolean) {
    ControlWebRTC.controlState.setState({ isInitiator });
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

  static async stopTrack(onStopingStart?: () => void) {
    const localStream = ControlWebRTC.getLocalStream();
    if (localStream) {
      onStopingStart && onStopingStart();
      ControlWebRTC.events.publish("stopingStart");
      //Сделано что быкорректно отработал Preloader. Требуеться использовать visibility для video + Preloader
      await Utils.sleep(10);
      localStream.getTracks().forEach((track) => {
        track.stop();
        localStream.removeTrack(track);
      });
    }
    await Utils.sleep(50);
  }

  /*#############----------<{ Основной функционал }>-----------#############*/
  static async initPeerConnection({ configuration }: InitPeerConnectionPayload, options?: { timeReConnect: number; numberOfRepit: number }) {
    const state = ControlWebRTC.controlState.getState();
    if (state.pc) {
      await ControlWebRTC.destroy();
    }
    const pc = new RTCPeerConnection(configuration);
    ControlWebRTC.controlState.setState({
      pc,
      timeReConnect: options?.timeReConnect ?? defaultState.timeReConnect,
      numberOfRepit: options?.numberOfRepit ?? defaultState.numberOfRepit,
    });
    ControlWebRTC.peerConnectionsEvents("add", pc).then(() => {});
    ControlWebRTC.events.publish("pc", pc);

    // const senders = pc.getSenders(); //Массив треков
    // const receiv = pc.getReceivers(); //массив треков
  }

  static startInitiatorCalling() {
    ControlWebRTC.setInitiatorRole(true);
    ControlWebRTC.startCreateOffer();
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
    const { iceRestart, iceRestartInProgress, isInitiator } = ControlWebRTC.controlState.getState();
    const pc = ControlWebRTC.getPeerConnection();

    if (!pc) return;

    if (iceRestartInProgress && isInitiator) {
      console.log("Перезапуск ICE в процессе, создаем offer");
      ControlWebRTC.startCreateOffer(); //TODO:  временнная мера
      return;
    }
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
    const { iceRestartInProgress } = ControlWebRTC.controlState.getState();
    switch (e.target.signalingState) {
      case "have-local-offer":
        console.log("signalingState: (have-local-offer): offer добавлен в setLocalDescription");
        break;
      case "have-remote-offer":
        console.log("signalingState: (have-remote-offer): offer добавлен в setRemoteDescription");
        break;
      case "stable":
        console.log("signalingState: (stable): ICE переговоры завершены");
        ControlWebRTC.controlState.setState({ iceRestart: true });
        if (iceRestartInProgress) {
          ControlWebRTC.resetRestartOfRepit();
        }
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
    const { timeReConnect, numberOfRepit } = ControlWebRTC.controlState.getState();
    const pc = e.target as RTCPeerConnection;
    const status = pc.iceConnectionState;

    /*
      failed | disconnected - автоматический способ востановления соединения когда уже проблема случилась
      handleNetworkChange метод ручного востановления failed | disconnected
    */
    ControlWebRTC.events.publish("iceConnection", status);

    ControlWebRTC.resetRestartTimeout();

    switch (status) {
      //failed - означает, что ICE-агент исчерпал все попытки и окончательно признал соединение потерянным.
      case "failed":
        console.log("ICE (failed) агент исчерпал все попытки автоматически подключиться, пытаемся перезапустить...");
        ControlWebRTC.restartIce();
        break;
      /*
        disconnected - означает, что ICE-агент временно потерял связь с удаленной стороной, но всё еще пытается восстановить соединение 
        автоматически (ищет альтернативные кандидаты, повторяет проверки). Система не сдалась.
        */
      case "disconnected":
        console.log("ICE соединение потеряно, ожидаем восстановления от браузера...");
        {
          if (timeReConnect <= 0) return;
          console.log("Устанавливаем и ориентируемся на таймер восстановления соединения...");
          const controlStartActionEvery = ControlWebRTC.controlDelay.startActionEvery(() => ["connected", "completed"].includes(pc.iceConnectionState), {
            interval: timeReConnect,
            countAction: numberOfRepit,
          });
          controlStartActionEvery.promise
            .then(() => {
              ControlWebRTC.events.publish("timeoutDisconnected", "connected");
            })
            .catch(() => {
              ControlWebRTC.events.publish("timeoutDisconnected", "timeoutOff");
            });
        }

        break;

      case "connected":
      case "completed":
        console.log("ICE соединение установлено. Отработал после  signalingState >  stable");
        ControlWebRTC.resetRestartOfRepit();
        break;
      case "checking":
        console.log("ICE проверка соединения...");
        break;
    }
  }

  /*--------------------------------------------------------------------------------------------------------------------------*/
  /*--------------------------------------------------------------------------------------------------------------------------*/

  private static extractIceCredentials(sdp: string): Record<"ufrag" | "pwd", string | null> {
    const ufragMatch = sdp.match(/a=ice-ufrag:([^\r\n]+)/);
    const pwdMatch = sdp.match(/a=ice-pwd:([^\r\n]+)/);

    return {
      ufrag: ufragMatch ? ufragMatch[1] : null,
      pwd: pwdMatch ? pwdMatch[1] : null,
    };
  }

  static getIceRestartInfo(sdp: string) {
    const { previousRemoteUfrag, previousRemotePwd } = ControlWebRTC.controlState.getState();
    const { ufrag, pwd } = ControlWebRTC.extractIceCredentials(sdp);
    const isFirstOffer = !previousRemoteUfrag || !previousRemotePwd;

    const isRestart = !isFirstOffer && ufrag !== null && previousRemoteUfrag !== ufrag;

    ControlWebRTC.controlState.setState({
      previousRemoteUfrag: ufrag,
      previousRemotePwd: pwd,
    });

    return { isRestart, ufrag, pwd };
  }
  private static async startCreateOffer() {
    const { iceRestart } = ControlWebRTC.controlState.getState();
    const pc = ControlWebRTC.getPeerConnection();
    if (!pc) return;
    console.log("##########--------<{ Создание offer }>---------##########");
    const options = { offerToReceiveAudio: true, offerToReceiveVideo: true, iceRestart };

    const { type, sdp } = await pc.createOffer(options);
    await pc.setLocalDescription({ type, sdp });
    ControlWebRTC.events.publish("offer", { type: "offer", sdp: sdp! });
  }

  static async setRemoteOffer({ sdp }: { sdp: string }) {
    let pc = ControlWebRTC.getPeerConnection()!;
    const { isRestart, ufrag, pwd } = ControlWebRTC.getIceRestartInfo(sdp);
    if (isRestart) {
      ControlWebRTC.events.publish("remoteRestart", { ufrag: ufrag!, pwd: pwd! });
    }

    await pc.setRemoteDescription({ type: "offer", sdp });
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    return answer;
  }
  static async setRemoteAnswer({ sdp }: { sdp: string }) {
    const pc = ControlWebRTC.getPeerConnection();
    if (!pc) return;
    await pc.setRemoteDescription({ type: "answer", sdp });
    return null;
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
      ControlWebRTC.resetRestartTimeout();
    });
  }
  private static resetRestartTimeout() {
    if (ControlWebRTC.restartTimeout) {
      clearTimeout(ControlWebRTC.restartTimeout);
      ControlWebRTC.restartTimeout = null;
    }
  }
  private static resetRestartOfRepit() {
    ControlWebRTC.controlState.setState({
      iceRestartInProgress: false,
      totalNumberOfRepit: 0,
    });
  }

  private static restartIce() {
    const { pc } = ControlWebRTC.controlState.getState();
    if (!pc) {
      ControlWebRTC.controlState.setState({ iceRestartInProgress: false });
      return;
    }
    console.log("Перезапуск ICE...");
    try {
      if (pc.restartIce) {
        pc.restartIce();
        console.log("ICE перезапущен через restartIce(). Будет вызов negotiationneeded");
      }
    } catch (error) {
      console.error("Ошибка при перезапуске ICE:", error);
      ControlWebRTC.controlState.setState({ iceRestartInProgress: false });
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
