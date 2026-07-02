import { Utils } from "dev-classes";
import type { CanvasCallInfo, SizesItem } from "./CanvasCallRecorder.types";

type MediaStreams_P = Record<"localStream" | "remoteStream", MediaStream>;

export interface CanvasVideoRenderingState {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  animationFrameId: number | null;
  audioContext: AudioContext | null;
  fps?: number;
}

const defaultState: CanvasVideoRenderingState = {
  fps: 60,
  canvas: null,
  ctx: null,
  animationFrameId: null,
  audioContext: null,
};

const defaultSizes: SizesItem = { w: 0, h: 0, x: 0, y: 0 };

const defaultCallInfoState: CanvasCallInfo = {
  local: {
    name: "",
    sizes: defaultSizes,
    isMirrorVideo: false,
  },
  remote: {
    name: "",
    sizes: defaultSizes,
    isMirrorVideo: false,
  },
  showTimestamp: true,
};

export class CanvasVideoRendering {
  private state = defaultState;
  private callInfo = defaultCallInfoState;
  private settings = {
    fontSize: 14,
    dateFillWidth: 135,
    dateYPadding: 20,
    textFillHeight: 30,
  };

  getIsAnimationActive() {
    return this.state.animationFrameId !== null;
  }
  private getSettings() {
    return this.settings;
  }
  setCallInfo(callInfo: Partial<CanvasCallInfo>) {
    this.callInfo = Utils.deepMerge(this.callInfo, callInfo) as CanvasCallInfo;
  }
  private getCallInfo() {
    return this.callInfo;
  }
  private setState(state: Partial<CanvasVideoRenderingState>) {
    this.state = { ...this.state, ...state };
  }
  private getState() {
    return this.state;
  }

  private resetState() {
    this.state = defaultState;
  }
  private resetCallInfoState() {
    this.callInfo = defaultCallInfoState;
  }

  private startedAudio({ audioContext, dest, stream }: { audioContext: AudioContext; dest: AudioNode; stream: MediaStream }, position: "left" | "right") {
    if (stream.getAudioTracks().length > 0) {
      const source = audioContext.createMediaStreamSource(stream);

      const gainNode = new GainNode(audioContext, {
        gain: 1.0, // можно регулировать
      });

      const stereoPanner = new StereoPannerNode(audioContext, {
        pan: position === "left" ? -0.5 : 0.5, // оба в обоих ушах. Если -1 звук в лево уйдёт, 1 - вправо
      });

      source.connect(gainNode);
      gainNode.connect(stereoPanner);
      stereoPanner.connect(dest);
    }
  }

  private async mixAudioStreams({ localStream, remoteStream }: MediaStreams_P): Promise<MediaStream | null> {
    try {
      const audioContext = new AudioContext();
      this.setState({ audioContext });

      const dest = audioContext.createMediaStreamDestination();
      this.startedAudio({ audioContext, dest, stream: localStream }, "left");
      this.startedAudio({ audioContext, dest, stream: remoteStream }, "right");

      await audioContext.resume();

      console.log("AudioContext state:", audioContext.state);

      return dest.stream;
    } catch (error) {
      console.error("Ошибка микширования аудио:", error);
      return null;
    }
  }

  async getAudioChanelsInStream(canvasStream: MediaStream, { localStream, remoteStream }) {
    const mixedAudioStream = await this.mixAudioStreams({ localStream, remoteStream });
    if (mixedAudioStream) {
      mixedAudioStream.getAudioTracks().forEach((track) => {
        canvasStream.addTrack(track);
      });
    }
    return canvasStream;
  }

  private drawRemoteVideo(remoteVideo: HTMLVideoElement, config: SizesItem) {
    const { canvas, ctx } = this.getState();
    if (!canvas || !ctx) return;
    const { name } = this.getCallInfo().remote;
    const { x, y, w, h } = config;
    //TODO: Если понадобиться isMirrorVideo то можно пробросить как в drawLocalVideo

    const videoWidth = remoteVideo.videoWidth || 640;
    const videoHeight = remoteVideo.videoHeight || 480;

    // Считаем масштаб, чтобы видео покрыло весь контейнер (режим Cover)
    const scaleX = w / videoWidth;
    const scaleY = h / videoHeight;
    const scale = Math.max(scaleX, scaleY);

    // Вычисляем новые размеры видео
    const newWidth = videoWidth * scale;
    const newHeight = videoHeight * scale;

    // Смещаем, чтобы отцентрировать обрезанную область ВНУТРИ контейнера
    const offsetX = x + (w - newWidth) / 2;
    const offsetY = y + (h - newHeight) / 2;

    // Очищаем область контейнера (опционально, если нужно)
    // ctx.clearRect(x, y, w, h);

    ctx.drawImage(remoteVideo, offsetX, offsetY, newWidth, newHeight);

    this.drawBackground({ x: 0, y, w, h: 20 });
    this.drawText(name, { fontSize: 12, x: 6, y: 13 });
  }

  private drawLocalVideo(localVideo: HTMLVideoElement, config: SizesItem & { isMirrorVideo?: boolean; radius?: number }) {
    const { ctx } = this.getState();
    if (!ctx) return;
    const { name } = this.getCallInfo().local;
    const panelHeightText = 20;
    ctx.save();

    const { isMirrorVideo, x, y, w, h } = config;
    const lvlShadow = 2;
    const radius = config?.radius || 5; // радиус закругления (можно регулировать)
    const videoY = y + panelHeightText;


    this.applyShadowByElevation(ctx, lvlShadow);

    this.drawRoundedRectPath(ctx, x, videoY, w, h, radius);
    ctx.fillStyle = "#1B1D21"; // Нужно что-то залить, чтобы тень появилась
    ctx.fill();
    ctx.restore();


    // 2. Теперь делаем clip для видео
    ctx.save();
    this.drawRoundedRectPath(ctx, x, videoY, w, h, radius);
    ctx.clip();

    if (isMirrorVideo) {
      ctx.scale(-1, 1);
      ctx.drawImage(localVideo, -x - w, y + panelHeightText, w, h);
    } else {
      ctx.drawImage(localVideo, x, y + panelHeightText, w, h);
    }
    ctx.restore();
    // this.drawBackground({ x, y: y + panelHeight, w, h: panelHeight });
    this.drawText(name, { fontSize: 10, x: x + 6, y: y + 13 });
  }

  private drawRoundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  private createCanvas = (canvasElement?: HTMLCanvasElement) => {
    let { ctx, canvas } = this.getState();
    if (!ctx) {
      canvas = canvasElement ? canvasElement : document.createElement("canvas");
      ctx = canvas.getContext("2d");
      this.setState({ canvas, ctx });
    }
    return { canvas, ctx };
  };

  private drawBackground(config: Record<"x" | "y" | "w" | "h", number> & { color?: string; alpha?: number }) {
    const { ctx } = this.getState();
    if (!ctx) return;
    const { x, y, w, h } = config;
    ctx.globalAlpha = config.alpha ? config.alpha : 0.3;
    ctx.fillStyle = config?.color ? config.color : "black";
    ctx.fillRect(x, y, w, h);
    ctx.globalAlpha = 1;
  }

  private drawText(text: string, config: Record<"x" | "y", number> & { color?: string; fontSize?: number }) {
    const { ctx } = this.getState();
    if (!ctx) return;
    const { x, y } = config;
    const defaultSettigns = this.getSettings();
    const fontSize = config.fontSize ? config.fontSize : defaultSettigns.fontSize;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = config?.color ? config.color : "white";
    ctx.fillText(text, x, y);
  }

  private drawTimestamp() {
    const { canvas, ctx } = this.getState();
    if (!canvas || !ctx) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    const dateTimeStr = `${dateStr} ${timeStr}`;

    // Фон для времени
    this.drawBackground({ x: 0, y: canvas.height - 50, w: 135, h: 20 });
    this.drawText(dateTimeStr, { fontSize: 12, x: 10, y: canvas.height - 36 });
  }

  startRenderingCanvas(localVideo: HTMLVideoElement, remoteVideo: HTMLVideoElement, options?: { fps?: number; canvasElement?: HTMLCanvasElement }) {
    const targetFPS = options?.fps || 30;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    let countFrame = 0;
    let countByFps = 0;
    const drawFrame = (currentTime: number) => {
      const { canvas, ctx } = this.createCanvas(options?.canvasElement);

      if (!canvas || !ctx) {
        this.state.animationFrameId = requestAnimationFrame(drawFrame);
        return;
      }

      // Проверяем, что видео готово
      if (!remoteVideo || remoteVideo.videoWidth === 0 || remoteVideo.paused) {
        this.state.animationFrameId = requestAnimationFrame(drawFrame);
        return;
      }

      const elapsed = currentTime - lastFrameTime;
      countFrame++;

      if (elapsed >= frameInterval) {
        countByFps++;

        lastFrameTime = currentTime - (elapsed % frameInterval);

        const { remote, local, showTimestamp } = this.getCallInfo();

        canvas.width = remote.sizes.w;
        canvas.height = remote.sizes.h;

        // Очищаем canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawRemoteVideo(remoteVideo, remote.sizes);

        if (localVideo) {
          this.drawLocalVideo(localVideo, { ...local.sizes, isMirrorVideo: local.isMirrorVideo });
          // this.Card(() => this.drawLocalVideo(localVideo, { ...local.sizes, isMirrorVideo: local.isMirrorVideo }), { ...local.sizes, elevation: 7 });
        }

        if (showTimestamp) {
          this.drawTimestamp();
        }
      }
      // Продолжаем анимацию
      this.state.animationFrameId = requestAnimationFrame(drawFrame);
    };

    lastFrameTime = performance.now();
    drawFrame(lastFrameTime);

    const { canvas } = this.createCanvas(options?.canvasElement);
    if (!canvas) return;

    const canvasStream = canvas.captureStream(options?.fps || 30);
    //с микширование звука
    const canvasStreamWithAudio = this.getAudioChanelsInStream(canvasStream, {
      localStream: localVideo.srcObject,
      remoteStream: remoteVideo.srcObject,
    });

    return canvasStreamWithAudio;
  }
  private cleanupCanvas() {
    if (this.state.canvas) {
      // Останавливаем все треки
      const stream = this.state.canvas.captureStream();
      stream.getTracks().forEach((track) => track.stop());
      const ctx = this.state.canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
      }

      this.state.canvas = null;
      this.state.ctx = null;
    }
  }

  private cleanupAudio() {
    if (this.state.audioContext) {
      this.state.audioContext.close().catch((err) => console.warn("Error closing audio context:", err));
      this.state.audioContext = null;
    }
  }
  private cleanupAnimation() {
    if (this.state.animationFrameId) {
      cancelAnimationFrame(this.state.animationFrameId);
      this.state.animationFrameId = null;
    }
  }
  stopRenderingCanvas = () => {
    this.cleanupAnimation();
    this.cleanupAudio();
    this.cleanupCanvas();
  };

  destroy = () => {
    this.stopRenderingCanvas();
    this.resetState();
    this.resetCallInfoState();
  };

  getCorrentLocalVideoSize({ videoHeight, videoWidth, offsetHeight, offsetWidth }: Record<"videoHeight" | "videoWidth" | "offsetHeight" | "offsetWidth", number>) {
    const containerAspectRatio = offsetWidth / offsetHeight;
    const videoAspectRatio = videoWidth / videoHeight;

    let actualWidth, actualHeight;

    if (videoAspectRatio > containerAspectRatio) {
      // Видео шире контейнера → чёрные полосы сверху/снизу
      actualWidth = offsetWidth;
      actualHeight = offsetWidth / videoAspectRatio;
    } else {
      // Видео уже контейнера → чёрные полосы слева/справа
      actualHeight = offsetWidth;
      actualWidth = offsetWidth * videoAspectRatio;
    }

    return {
      width: actualWidth,
      height: actualHeight,
    };
  }

  private applyShadowByElevation(ctx: CanvasRenderingContext2D, lvlShadow: number) {
    // Таблица теней для разных elevation (как в Material Design)
    const shadows = {
      0: { blur: 0, offsetY: 0, color: "rgba(0,0,0,0)" },
      1: { blur: 2, offsetY: 1, color: "rgba(0,0,0,0.5)" },
      2: { blur: 4, offsetY: 2, color: "rgba(0,0,0,0.5)" },
      3: { blur: 5, offsetY: 3, color: "rgba(0,0,0,0.5)" },
      4: { blur: 6, offsetY: 4, color: "rgba(0,0,0,0.5)" },
      5: { blur: 8, offsetY: 5, color: "rgba(0,0,0,0.5)" },
      6: { blur: 10, offsetY: 6, color: "rgba(0,0,0,0.5)" },
      7: { blur: 12, offsetY: 7, color: "rgba(0,0,0,0.5)" },
      8: { blur: 14, offsetY: 8, color: "rgba(0,0,0,0.5)" },
    };

    // Ограничиваем elevation от 0 до 8
    const level = Math.min(Math.max(lvlShadow, 0), 8);
    const shadow = shadows[level];

    ctx.shadowColor = shadow.color;
    ctx.shadowBlur = shadow.blur;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = shadow.offsetY;
  }
}
