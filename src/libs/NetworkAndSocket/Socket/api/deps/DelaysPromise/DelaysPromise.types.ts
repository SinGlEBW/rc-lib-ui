export interface ControlAction{
  stop(status?: boolean):void; 
  getIsActiveEvent():boolean; 
}

interface  StartActionEveryConfigI {
  interval: number,
  cutoffTime?: number;//4000
  countAction?:number;//example 5
  watchIdInterval?(id:number | null):void;
  controlAction?(control:ControlAction):void
}

interface OneOfPromiseReject{
  status: boolean;
  msg: string;
}

export interface DelaysPromiseProps{
  startActionEvery: (cb: () => boolean, config: StartActionEveryConfigI) => {
    stop: ControlAction['stop'],
    promise: Promise<{status: boolean, msg: string}>
  }
  oneOf: <T = any>(watchPromise: () => Promise<T>, potentialCaseCB: () => void, config: {second: number}) => void
  oneOfPromise:<T = any>(watchPromise: () => Promise<any>, cbPotentialReject: (p:OneOfPromiseReject) => OneOfPromiseReject, config: {second: number}) => Promise<T>
}
