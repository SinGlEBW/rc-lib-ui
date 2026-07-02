import { EventSubscribers } from "dev-classes";
import { ALL_FORMATS, BlobSource, BufferTarget, Conversion, Input, Mp4OutputFormat, Output, WebMOutputFormat } from "mediabunny";
import { ControlTimerFormat } from "./ControlTimerFormat";
import type { CanvasCallRecorder_Events, CanvasCallRecorderState } from "./CanvasCallRecorder.types";
import { CanvasVideoRendering } from "./CanvasVideoRendering";

const defaultState: CanvasCallRecorderState = {
  isRecording: false,
  mediaRecorder: null,
  recordedChunks: [],
  format: "webm",
  mimeType: "video/webm",
};

interface StartRecordingPayload {
  stream: MediaStream;
  videoBitsPerSecond?: number;
  audioBitsPerSecond?: number;
  timeslice?: number;
  format: "webm" | "mp4";
}
export interface StartRecordingEvents {
  onRecording?(blob: Blob): void;
  onStop?(fullChunks: Blob): void;
  onError?(error: any): void;
}
export type StartRecording = (a: StartRecordingPayload, b: StartRecordingEvents) => void;

export class CanvasCallRecorder {
  private state = defaultState;
  private events = new EventSubscribers<CanvasCallRecorder_Events>(["timeUpdate", "recordingStart"]);
  controlCanvas = new CanvasVideoRendering();

  on = this.events.subscribe;
  off = this.events.unsubscribe;

  private getState = () => this.state;
  private setState = (payload: Partial<CanvasCallRecorderState>) => {
    this.state = { ...this.state, ...payload };
  };
  getStatusRecording = () => this.state.isRecording;
  startRecording: StartRecording = ({ stream, videoBitsPerSecond, audioBitsPerSecond, timeslice = 1000, format = "webm" }, { onRecording, onStop, onError }) => {
    const { isRecording } = this.getState();
    if (isRecording) {
      console.warn("Запись уже идет");
      return;
    }

    try {
      const mimeType = this.getBestMimeType(format);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        // videoBitsPerSecond: options?.videoBitsPerSecond || 2500000, //2.5 Mbps
        // audioBitsPerSecond: options?.audioBitsPerSecond || 128000, // 128 Kbps
      });
      this.setState({ recordedChunks: [], mediaRecorder, isRecording: true, format, mimeType });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.state.recordedChunks.push(event.data);
          onRecording && onRecording(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const { mimeType, recordedChunks } = this.getState();
        const fullChunks = new Blob(recordedChunks, { type: mimeType });

        this.setState({ isRecording: false });
        onStop && onStop(fullChunks);
      };

      mediaRecorder.onerror = (event) => {
        this.setState({ isRecording: false });
        //@ts-ignore
        onError && onError("Ошибка записи: " + event?.error);
      };

      mediaRecorder.start(timeslice);
      this.startTimer();
      this.events.publish("recordingStart");
      console.log("🔴 запись началась");
    } catch (error) {
      onError && onError("recordingError: " + error);
      this.controlCanvas.stopRenderingCanvas();
    }
  };

  async stopRecording(): Promise<{ fullChunks: Blob | null; format: "webm" | "mp4" } | null> {
    return new Promise((resolve) => {
      const { mediaRecorder, isRecording } = this.getState();

      if (this.controlCanvas.getIsAnimationActive()) {
        this.controlCanvas.stopRenderingCanvas();
      }
      if (!mediaRecorder || !isRecording) {
        console.warn("Нет активной записи");
        resolve(null);
        return;
      }

      const onStopHandler = () => {
        const { recordedChunks, mimeType, format } = this.getState();

        const fullChunks = new Blob(recordedChunks, { type: mimeType });

        this.fixWithMediabunny(fullChunks, mimeType, format).then((blob) => {
          this.stopTimer();
          resolve({ fullChunks: blob, format });
        });

        // resolve({ fullChunks, format });
      };

      mediaRecorder.addEventListener("stop", onStopHandler, { once: true });
      mediaRecorder.stop();
    });
  }

  async saveRecording(blob: Blob, filename?: string): Promise<string | null> {
    if (!blob) return null;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || `canvas-call-${new Date().toISOString()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`💾 Запись сохранена: ${a.download}`);
    return a.download;
  }

  private getBestMimeType(typeRecorder: "webm" | "mp4"): string {
    const types = {
      webm: ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm;codecs=h264,opus", "video/webm"],
      mp4: [
        "video/mp4;codecs=h264,aac", // Самый распространённый
        "video/mp4;codecs=avc1", // Только H.264 видео
        "video/mp4", // Упрощённый вариант
      ],
    };
    for (const type of types[typeRecorder]) {
      if (MediaRecorder.isTypeSupported(type)) {
        console.log(`📹 Выбран кодек: ${type}`);
        return type;
      }
    }

    return types[typeRecorder][types[typeRecorder].length - 1];
  }

  destroy() {
    const { mediaRecorder, isRecording } = this.getState();
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
    }
    this.controlCanvas.stopRenderingCanvas();
    this.events.resetSubscribers();
  }

  controlTimer = new ControlTimerFormat();
  startTimer() {
    const { isRecording } = this.getState();

    const isTimer = this.controlTimer.getHasTimer();
    if (!isTimer && isRecording) {
      this.controlTimer.startTimer((timer) => {
        this.events.publish("timeUpdate", timer);
      });
    }
  }

  stopTimer() {
    this.controlTimer.stopTimer();
  }

  private async fixWithMediabunny(blob: Blob, mimeType: string, typeRecorder: "webm" | "mp4") {
    const input = new Input({
      source: new BlobSource(blob),
      formats: ALL_FORMATS,
    });

    const output = new Output({
      format: typeRecorder === "webm" ? new WebMOutputFormat({}) : new Mp4OutputFormat(), // или
      target: new BufferTarget(),
    });

    const conversion = await Conversion.init({ input, output });
    await conversion.execute();

    return new Blob([output.target.buffer!], { type: mimeType });
  }
}