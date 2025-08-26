import type { WsApiE_StatusConnect_OR } from './deps/WsApi';
import type { WsApi_Response } from './deps/WsApi/WsApi.types';

export interface SocketApi_Options_P {
  isReConnectNetworkOnline?: boolean;
  listUrlsCheckConnectNetwork?: string[];
}

type SocketApi_StateProps_OR = 'isDisconnect' | 'isActiveReConnect' | 'isOfflineSocket' | 'isReady' | 'isGotWasFirstConnection' | 'isStartCheckNetwork';
export type SocketApi_StateProps_P = Record<SocketApi_StateProps_OR, boolean>;
export type SocketApi_StatusConnect_OR = WsApiE_StatusConnect_OR;


export interface SocketRequest {
  action: string;
  [key: string]: any;
}

export type SocketResponse<P = any, Data = any> = WsApi_Response<P, Data>

export interface SocketApiOptionsRequest {
  timeout?: number,
  signal?: AbortSignal
}
