type StatusConnectSocket_OR = "ready" | "close" | "error" | "pending" | "disconnect";

export interface InitialStatePropsSocket  {
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
  setStatusConnectSocket: (payload: Pick<InitialStatePropsSocket, 'statusConnect'>) => void;
  setStatusIsReConnectSocket: (payload: Pick<InitialStatePropsSocket, 'isReConnectSocket'>) => void;
  setIsOfflineSocket: (payload: Pick<InitialStatePropsSocket, 'isOfflineSocket'>) => void;
  setInfoNoConnectServer: (payload: Partial<InitialStatePropsSocket['infoNoConnectServer']>) => void;
  setIsDisableConnectSocket: (payload: Pick<InitialStatePropsSocket, 'isDisableConnectSocket'>) => void;
}