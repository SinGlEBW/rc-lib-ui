export interface MediaStream_P {
  localStream: MediaStream | null;
}

export interface InitPeerConnectionPayload {
  configuration: Omit<RTCConfiguration, 'iceServers'> & {iceServers: (RTCIceServer & {credentialType?: string})[] } ;
  // mediaStream: MediaStream;
  // send(payload: object): void;
}


export interface SenderPromise_P {
  pc: RTCPeerConnection;
  generateTracks: Generator<MediaStreamTrack | undefined>;
  statusErr: boolean;
}


export interface ControlWebRTC_Events {
  pc: (pc: RTCPeerConnection) => void;
  offer: (payload: {type: 'offer', sdp: string}) => void;
  candidate: (payload: {type: 'candidate', candidate: any}) => void;
  remoteTracks: (payload: RTCTrackEvent) => void;
  iceConnection: (status: RTCIceConnectionState) => void;
  localStream: (stream: MediaStream) => void;
  onStopingStart: () => void;
}

export interface DefaultStateProps extends MediaStream_P{
  pc: null | RTCPeerConnection;
  activeUpdateOffer: boolean;
  isPlayLocalVideo: boolean;
  iceRestart: boolean;
  isInitEvents: boolean;
}