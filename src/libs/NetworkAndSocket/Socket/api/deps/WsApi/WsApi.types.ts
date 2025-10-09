
export interface WsApi_Options_P {
  url: string;
  timeReConnect: number;
  numberOfRepit?: number;
}

export type WsApiE_StatusConnect_OR = "pending" | "ready" | "error" | "close" | "disconnect";

export interface WsApi_Events {
  status(status: WsApiE_StatusConnect_OR): void
  msg(message: any): void
  error(error: {
    readyState: number,
    arrSaveReq: WsApi_StateProps['arrSaveReq']
  }): void
}

export interface WsApi_RequestMeta<P>{
  requestAction: string,
  requestTime: number,
  payload: P, 
  request_id: string, 
}
export type WsApi_Response<P, D> = D & {request: WsApi_RequestMeta<P>}
export interface WsApi_SaveRequest_P<P, D> extends WsApi_RequestMeta<P>{
  cb: (response: WsApi_Response<P, D>) => void
}
export interface WsApi_StateProps {
  statusConnect: WsApiE_StatusConnect_OR;
  ws: null | WebSocket;
  arrSaveReq: {
    requestAction: string,
    requestTime: number,
    payload: {action: string, [key: string]: any}, 
    request_id: string, 
    cb: any
  }[];
}

