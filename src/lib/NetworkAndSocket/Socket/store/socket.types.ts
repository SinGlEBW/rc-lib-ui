type StatusConnectSocket_OR = "ready" | "close" | "error" | "pending" | "disconnect";

export interface InitialStateProps  {
  statusConnect: StatusConnectSocket_OR,
  isReConnectSocket: boolean,
  isOfflineSocket: boolean,
  isDisableConnectSocket:boolean,
  infoNoConnectServer: {
    isModal: boolean,
    isSelectOffline: boolean,
  }
}



export interface SocketActions {
  resetState: () => void;
  setStatusConnectSocket: (payload: Pick<InitialStateProps, 'statusConnect'>) => void;
  setStatusIsReConnectSocket: (payload: Pick<InitialStateProps, 'isReConnectSocket'>) => void;
  setIsOfflineSocket: (payload: Pick<InitialStateProps, 'isOfflineSocket'>) => void;
  setInfoNoConnectServer: (payload: Partial<InitialStateProps['infoNoConnectServer']>) => void;
  setIsDisableConnectSocket: (payload: Pick<InitialStateProps, 'isDisableConnectSocket'>) => void;
}