type StatusConnectSocket_OR = "ready" | "close" | "error" | "pending" | "disconnect";

export interface InitialStatePropsSocket  {
  statusConnect: StatusConnectSocket_OR,
  isReConnectSocket: boolean,
  isOfflineSocket: boolean,
  isDisableConnectSocket:boolean,
  isReadySocket: boolean,//Что бы не просматривать статусы и не перерендеривать лишний раз в хуках
  infoNoConnectServer: {
    isModal: boolean,
    isSelectOffline: boolean,
  }
}



export interface SocketActions {
  resetState: () => void;
  setStatusConnectSocket: (payload: Pick<InitialStatePropsSocket, 'statusConnect'>) => void;
  setStatusIsReConnectSocket: (payload: Pick<InitialStatePropsSocket, 'isReConnectSocket'>) => void;
  setStatusReady: (payload: Pick<InitialStatePropsSocket, 'isReadySocket'>) => void;
  setIsOfflineSocket: (payload: Pick<InitialStatePropsSocket, 'isOfflineSocket'>) => void;
  setInfoNoConnectServer: (payload: Partial<InitialStatePropsSocket['infoNoConnectServer']>) => void;
  setIsDisableConnectSocket: (payload: Pick<InitialStatePropsSocket, 'isDisableConnectSocket'>) => void;
}