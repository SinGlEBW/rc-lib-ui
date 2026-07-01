export interface UniversalControlBitrateState {
  audio: number; // Битрейт для аудио в kbps
  video: number; // Битрейт для видео в kbps
  screen: number; // Битрейт для экрана в kbps (минимум 300 kbps)
  data: number; // Битрейт для данных (data channels)
  isScreenSharing: boolean
}

interface OpusConfig {
  stereo?: "0" | "1"; // Стерео (1) или моно (0)
  "sprop-stereo"?: "0" | "1"; // Рекомендуемое стерео для приемника
  maxaveragebitrate?: number; // Максимальный средний битрейт (kbps → bps)
  maxplaybackrate?: number; // Максимальная частота дискретизации (kbps → bps)
  cbr?: "0" | "1"; // Постоянный (1) или переменный (0) битрейт
  useinbandfec?: "0" | "1"; // Использовать FEC для восстановления потерь
  usedtx?: "0" | "1"; // Использовать DTX (Discontinuous Transmission)
  maxptime?: number; // Максимальное время пакета (мс)
}

export interface UniversalControlBitrateI {
  setApplicationSpecificBandwidth: (sdp: string, config: UniversalControlBitrateState) => string;
  /**
   * @example {
    * // Высококачественное стерео для музыки
    *    sdp = BandWidthHandler.setOpusAttributes(sdp, {
    *      stereo: "1",
    *      "sprop-stereo": "1",
    *      maxaveragebitrate: 128,    // 128 kbps
    *      maxplaybackrate: 48000,    // 48 kHz
    *      cbr: "0"                   // переменный битрейт лучше для музыки
    *    });
    *
    *  // Речь с низким битрейтом и FEC для плохого соединения
    *  sdp = BandWidthHandler.setOpusAttributes(sdp, {
    *    stereo: "0",
    *    maxaveragebitrate: 20,     // 20 kbps (WB речь)
    *    useinbandfec: "1",         // FEC для устойчивости к потерям
    *    usedtx: "1"                // DTX экономит трафик в паузах
    *  });
    * 
    *  // Максимальное качество
    *  sdp = BandWidthHandler.setOpusAttributes(sdp, {
    *    stereo: "1",
    *    maxaveragebitrate: 510,    // 510 kbps (максимум Opus)
    *    maxplaybackrate: 48000,
    *    cbr: "0"
    *  });
   * }
   */
  setOpusAttributes: (sdp: string, params: OpusConfig) => string;
  setMultiopusAttributes: (sdp: string, channels: number) => string;

}
