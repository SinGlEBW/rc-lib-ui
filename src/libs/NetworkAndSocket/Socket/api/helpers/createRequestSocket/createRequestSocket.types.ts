import type { BasePayloadSocket } from '../../SocketApi.types';

export interface CreateRequestSocketProps<D>{
  payload: D & BasePayloadSocket,
  signal?: AbortSignal
}


