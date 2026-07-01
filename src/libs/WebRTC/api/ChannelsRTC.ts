import { EventSubscribers } from "dev-classes";
import { ControlWebRTC } from "./ControlWebRTC";
import type { ControlWebRTC_Events } from "./ControlWebRTC.types";

type Room_id = number | string;
export class ChannelsRTC<T = string> {
  private _channels = new Map<T, RTCDataChannel>();
  private _listChannels = new Map<string | number, typeof this._channels>();
  private eventsControlWebRTC: EventSubscribers<ControlWebRTC_Events>;
  constructor(eventsControlWebRTC: EventSubscribers<ControlWebRTC_Events>) {
    this.eventsControlWebRTC = eventsControlWebRTC;
  }
  public createChannel(nameChannel: T, statusOffer: "in-offer" | "out-offer", room_id: Room_id) {
    room_id = String(room_id);
    return new Promise<RTCDataChannel>((resolve, reject) => {
      const startInstall = (pc: RTCPeerConnection) => {
        let oldChannel = this._channels.get(nameChannel);
        if (oldChannel) {
          if (oldChannel.readyState !== "open") {
            this.close(room_id, nameChannel);
            oldChannel = undefined;
          }
        }
        if (!oldChannel) {
          if (statusOffer === "out-offer") {
            const channel = pc.createDataChannel(nameChannel as string);
            this.set(room_id, nameChannel, channel);
            resolve(channel);
          }
          if (statusOffer === "in-offer") {
            pc.ondatachannel = (event) => {
              const channel = event.channel;
              this.set(room_id, nameChannel, channel);
              resolve(channel);
            };
          }
        }
      };

      const pc = ControlWebRTC.getPeerConnection();
      if (pc) {
        startInstall(pc);
      } else {
        this.eventsControlWebRTC.subscribeOnce("pc", startInstall);
      }
    });
  }

  public get(room_id: Room_id, nameChannel: T) {
    room_id = String(room_id);
    return this._listChannels.get(room_id)?.get(nameChannel);
  }
  public close(room_id: Room_id,nameChannel: T) {
    room_id = String(room_id);
    const channel = this._listChannels.get(room_id)?.get(nameChannel);
    if(channel){
      channel.close();
      this._listChannels.get(room_id)?.delete(nameChannel);
      if(this._listChannels.get(room_id)?.size === 0){
        this._listChannels.delete(room_id);
      }
    }
  }
  private set(room_id: Room_id, nameChannel: T, channel: RTCDataChannel) {
    if(this._listChannels.has(room_id)){
      this._listChannels.get(room_id)!.set(nameChannel, channel);
    }else{
      this._listChannels.set(room_id, new Map([[nameChannel, channel]]));
    }
  }
}
