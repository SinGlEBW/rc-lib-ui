export interface CreateRequestSocketProps<D = any>{
  payload:D
  socketAction: string;
  signal?: AbortSignal
}


