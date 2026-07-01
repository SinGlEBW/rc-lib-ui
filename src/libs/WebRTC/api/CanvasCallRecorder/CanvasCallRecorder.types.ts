export interface CanvasCallRecorder_Events {
  recordingStart: () => void;
  recordingStop: (blob: Blob) => void;

  watchRecording: (blob: Blob) => void;
  timeUpdate: (time: string) => void;
}

export interface CanvasCallRecorderState {
  isRecording: boolean;
  mediaRecorder: MediaRecorder | null;
  recordedChunks: Blob[];
  format: "webm" | "mp4";
  mimeType: string;
}

export type SizesItem = Record<"w" | "h" | "x" | "y", number>;
type BasePropsItemCallInfo = {
  name: string;
  sizes: SizesItem;
  isMirrorVideo?: boolean;
};
export interface CanvasCallInfo {
  local: BasePropsItemCallInfo;
  remote: BasePropsItemCallInfo;
  // fps?: number,
  // canvasElement?: HTMLCanvasElement
  showTimestamp?: boolean;
}
