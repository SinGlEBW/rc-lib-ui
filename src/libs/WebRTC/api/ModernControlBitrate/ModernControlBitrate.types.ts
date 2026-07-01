export type BitratesDataItem = { video: number; audio: number; data?: number; screen?: number };

export type NetworkQuality_OR = "excellent" | "good" | "poor" | "critical";
export interface ModernControlBitrateState {
  audio: number; // Битрейт для аудио в kbps
  video: number; // Битрейт для видео в kbps
  screen: number; // Битрейт для экрана в kbps (минимум 300 kbps)
  data: number; // Битрейт для данных (data channels)
  isScreenSharing: boolean;
  bitrates: BitratesDataItem[];
  lastQuality: NetworkQuality_OR;
  lastPacketLoss: number;
  timeoutWatcher: number;
}

type LocalStats = Record<
  | "packetsSent"
  | "bytesSent"
  | "bitrate"
  | "fps"
  | "framesSent"
  | "keyFramesEncoded"
  | "frameWidth"
  | "frameHeight"
  | "ssrc"
  | "nackCount"
  | "pliCount",
  number
> & 
Record<
  | "videoBitrate"
  | "audioBitrate",
  string
> & 
{
  codec: string;
  qualityLimitationReason: string;
};

type RemoteStats = Record<
  | "jitter"
  | "packetsLost"
  | "packetsReceived"
  | "totalPackets"
  | "packetLossPercent"
  | "fps"
  | "jitterBufferDelay"
  | "framesReceived"
  | "framesDropped"
  | "framesDecoded"
  | "frameWidth"
  | "frameHeight"
  | "ssrc",
  number
> & 
Record<
  | "videoBitrate"
  | "audioBitrate",
  string
> & 
{

  networkQuality: NetworkQuality_OR;
  codec: string;
  decoderImplementation: string;
  totalDecodeTime: string;
  totalProcessingDelay: string;
};

export interface WebRTCStats {
  local: LocalStats;
  remote: RemoteStats;
}

export interface ModernControlBitrate_Events {
  bitrateChanged: (payload: WebRTCStats) => void;
}
