import { ControlState } from 'dev-classes';
import type { UniversalControlBitrateI, UniversalControlBitrateState } from './UniversalControlBitrate.types';
const defaultBandWidth:UniversalControlBitrateState = {
  audio: 128,
  video: 1000,
  screen: 2000,//качество при демонстрации экрана
  data: 500,
  isScreenSharing: false
}

/*
  INFO: Класс для всех браузеров, но требует по новой обмениться offer answer
  Android c 2014, IOS c 2015
*/
//INFO: Не используеться.
export class UniversalControlBitrate {
  // private static state = defaultBandWidth;
  private static controlState = new ControlState<UniversalControlBitrateState>(defaultBandWidth)

  //Универсальный метод 
  public static setApplicationSpecificBandwidth:UniversalControlBitrateI['setApplicationSpecificBandwidth'] = ( sdp, bandwidth ) => {
    UniversalControlBitrate.controlState.setState(bandwidth);

    const configBitrates = UniversalControlBitrate.controlState.getState();
    
    if (configBitrates.isScreenSharing) {
      if (!configBitrates.screen) {
        console.warn(
          "It seems that you are not using bandwidth for screen. Screen sharing is expected to fail."
        );
      } else if (configBitrates.screen < 300) {
        console.warn(
          "It seems that you are using wrong bandwidth value for screen. Screen sharing is expected to fail."
        );
      }
    }
   

    // if screen; must use at least 300kbs
    if (configBitrates.screen && configBitrates.isScreenSharing) {
      sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, "");
      sdp = sdp.replace(
        /a=mid:video\r\n/g,
        "a=mid:video\r\nb=AS:" + configBitrates.screen + "\r\n"
      );
    }

    // remove existing bandwidth lines
    if (configBitrates.audio || configBitrates.video || configBitrates.data) {
      sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, "");
    }

    if (configBitrates.audio) {
      sdp = UniversalControlBitrate.setMediaBitrates(sdp, "audio", configBitrates.audio)
    }

    if (configBitrates.video) {
      sdp = UniversalControlBitrate.setMediaBitrates(sdp, "video", (configBitrates.isScreenSharing ? configBitrates.screen : configBitrates.video))
    }

    return sdp;
  }

  /*
    INFO: Тонкая настройка. Специфичен для WebRTC и Chrome-клиентов
    влияет только на конкретный кодек (VP8)
  */
  public static setVideoBitrates = (sdp:string, params: Record<'min' | 'max', number>) => {
    const xgoogle_min_bitrate = params.min;
    const xgoogle_max_bitrate = params.max;

    const sdpLines = sdp.split("\r\n");

    // VP8
    const vp8Index = UniversalControlBitrate.findLine(sdpLines, "a=rtpmap", "VP8/90000");
    let vp8Payload;
    if (vp8Index) {
      vp8Payload = UniversalControlBitrate.getCodecPayloadType(sdpLines[vp8Index]);
    }

    if (!vp8Payload) {
      return sdp;
    }

    const rtxIndex = UniversalControlBitrate.findLine(sdpLines, "a=rtpmap", "rtx/90000");
    let rtxPayload;
    if (rtxIndex) {
      rtxPayload = UniversalControlBitrate.getCodecPayloadType(sdpLines[rtxIndex]);
    }

    if (!rtxIndex) {
      return sdp;
    }

    const rtxFmtpLineIndex = UniversalControlBitrate.findLine(
      sdpLines,
      "a=fmtp:" + rtxPayload.toString()
    );
    if (rtxFmtpLineIndex !== null) {
      let appendrtxNext = "\r\n";
      appendrtxNext +=
        "a=fmtp:" +
        vp8Payload +
        " x-google-min-bitrate=" +
        (xgoogle_min_bitrate || "228") +
        "; x-google-max-bitrate=" +
        (xgoogle_max_bitrate || "228");
      sdpLines[rtxFmtpLineIndex] =
        sdpLines[rtxFmtpLineIndex].concat(appendrtxNext);
      sdp = sdpLines.join("\r\n");
    }

    return sdp;
  };

  /*
    INFO: Настройка audio 
    Работает с rtpmap и fmtp
  */
  public static setOpusAttributes:UniversalControlBitrateI['setOpusAttributes'] = (sdp, params = {}) => {
    
    const sdpLines = sdp.split("\r\n");

    // Opus
    const opusIndex = UniversalControlBitrate.findLine(sdpLines, "a=rtpmap", "opus/48000");
    let opusPayload;
    if (opusIndex) {
      opusPayload = UniversalControlBitrate.getCodecPayloadType(sdpLines[opusIndex]);
    }

    if (!opusPayload) {
      return sdp;
    }

    const opusFmtpLineIndex = UniversalControlBitrate.findLine(
      sdpLines,
      "a=fmtp:" + opusPayload.toString()
    );
    if (opusFmtpLineIndex === null) {
      return sdp;
    }

    let appendOpusNext = "";
    appendOpusNext +=
      "; stereo=" + (typeof params?.stereo != "undefined" ? params?.stereo : "1");
    appendOpusNext +=
      "; sprop-stereo=" +
      (typeof params["sprop-stereo"] != "undefined"
        ? params["sprop-stereo"]
        : "1");

    if (typeof params.maxaveragebitrate != "undefined") {
      appendOpusNext +=
        "; maxaveragebitrate=" + (params.maxaveragebitrate ? Number(params.maxaveragebitrate) * 1024 * 8 : 128 * 1024 * 8);
    }

    if (typeof params.maxplaybackrate != "undefined") {
      appendOpusNext +=
        "; maxplaybackrate=" + (params.maxplaybackrate ? Number(params.maxplaybackrate) * 1024 * 8 : 128 * 1024 * 8);
    }

    if (typeof params.cbr != "undefined") {
      appendOpusNext +=
        "; cbr=" + (typeof params.cbr != "undefined" ? params.cbr : "1");
    }

    if (typeof params.useinbandfec != "undefined") {
      appendOpusNext += "; useinbandfec=" + params.useinbandfec;
    }

    if (typeof params.usedtx != "undefined") {
      appendOpusNext += "; usedtx=" + params.usedtx;
    }

    if (typeof params.maxptime != "undefined") {
      appendOpusNext += "\r\na=maxptime:" + params.maxptime;
    }

    sdpLines[opusFmtpLineIndex] =
      sdpLines[opusFmtpLineIndex].concat(appendOpusNext);

    sdp = sdpLines.join("\r\n");
    return sdp;
  };

  /*
    INFO: Настройка audio для объёмного звука работает с 5.1 | 7.1
    ВАЖНО: Работает только в Chrome
  */
  public static setMultiopusAttributes:UniversalControlBitrateI['setMultiopusAttributes'] = (sdp, channels = 6) => {
  // Только для Chrome и только если входной поток имеет нужное число каналов
  if (!/Chrome/.test(navigator.userAgent)) return sdp;
  
  const sdpLines = sdp.split("\r\n");
  
  // Заменяем OPUS на MULTIOPUS в rtpmap
  for (let i = 0; i < sdpLines.length; i++) {
    if (sdpLines[i].includes("OPUS/48000")) {
      // Сохраняем payload type
      const items = sdpLines[i].match(/a=rtpmap:(\d+)/);
      
      const payloadType = items![1];
      // Меняем на multiopus с указанием каналов
      sdpLines[i] = `a=rtpmap:${payloadType} multiopus/48000/${channels}`;
      
      // Добавляем параметры fmtp для 5.1 или 7.1
      const fmtpLineIndex = UniversalControlBitrate.findLine(
        sdpLines, 
        `a=fmtp:${payloadType}`
      );
      
      if (fmtpLineIndex !== null) {
        let mapping;
        if (channels === 6) { // 5.1 surround
          mapping = "num_streams=4;coupled_streams=2;channel_mapping=0,4,1,2,3,5";
        } else if (channels === 8) { // 7.1 surround
          mapping = "num_streams=5;coupled_streams=3;channel_mapping=0,4,1,2,3,5,6,7";
        }
        
        sdpLines[fmtpLineIndex] += `;${mapping}`;
      }
      break;
    }
  }
  
  return sdpLines.join("\r\n");
};

  // Find the line in sdpLines that starts with |prefix|, and, if specified,
  // contains |substr| (case-insensitive search).
  private static findLine(sdpLines, prefix, substr = '') {
    return UniversalControlBitrate.findLineInRange(sdpLines, 0, -1, prefix, substr);
  }

  // Find the line in sdpLines[startLine...endLine - 1] that starts with |prefix|
  // and, if specified, contains |substr| (case-insensitive search).
  private static findLineInRange(sdpLines, startLine, endLine, prefix, substr) {
    const realEndLine = endLine !== -1 ? endLine : sdpLines.length;
    for (let i = startLine; i < realEndLine; ++i) {
      if (sdpLines[i].indexOf(prefix) === 0) {
        if (
          !substr ||
          sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1
        ) {
          return i;
        }
      }
    }
    return null;
  }

  // Gets the codec payload type from an a=rtpmap:X line.
  private static getCodecPayloadType(sdpLine) {
    const pattern = new RegExp("a=rtpmap:(\\d+) \\w+\\/\\d+");
    const result = sdpLine.match(pattern);
    return result && result.length === 2 ? result[1] : null;
  }

  public static setMediaBitrates(sdp: string, media: "audio" | "video", bitrate: number) {
    UniversalControlBitrate.controlState.setState({[media]: bitrate});
    
    const lines = sdp.split("\n");
    let line = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].indexOf("m="+media) === 0) {
        line = i;
        break;
      }
    }
    if (line === -1) {
      console.debug("Could not find the m line for", media);
      return sdp;
    }
    console.debug("Found the m line for", media, "at line", line);
   
    // Pass the m line
    line++;
   
    // Skip i and c lines
    while(lines[line].indexOf("i=") === 0 || lines[line].indexOf("c=") === 0) {
      line++;
    }
   
    // If we're on a b line, replace it
    if (lines[line].indexOf("b") === 0) {
      console.debug("Replaced b line at line", line);
      lines[line] = "b=AS:"+bitrate;
      return lines.join("\n");
    }
    
    // Add a new b line
    console.debug("Adding new b line before line", line);
    let newLines = lines.slice(0, line)
    newLines.push("b=AS:"+bitrate)
    newLines = newLines.concat(lines.slice(line, lines.length))
    return newLines.join("\n")
  
  }

}


/*
    sdp = UniversalControlBitrate.setOpusAttributes(sdp, {
          // 'stereo': 0, // to disable stereo (to force mono audio)
          // 'sprop-stereo': 1,
          'maxaveragebitrate': 500 * 1024 * 8, // 500 kbits
          'maxplaybackrate': 500 * 1024 * 8, // 500 kbits
          // 'cbr': 0, // disable cbr
          // 'useinbandfec': 1, // use inband fec
          // 'usedtx': 1, // use dtx
          // 'maxptime': 3
        });
*/

