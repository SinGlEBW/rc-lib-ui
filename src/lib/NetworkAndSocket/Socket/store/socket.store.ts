import { create } from 'zustand';
import { defaultInitialState, initialState } from './socket.initial';
import { InitialStateProps, type SocketActions, } from './socket.types';



export const socketStore = create<InitialStateProps>(() => (initialState));


export const socketActions:SocketActions = {
  resetState: () => socketStore.setState(defaultInitialState),
  setStatusConnectSocket: ({statusConnect}) => socketStore.setState({ statusConnect }),
  setStatusIsReConnectSocket: ({isReConnectSocket}) => socketStore.setState({ isReConnectSocket }),
  setIsOfflineSocket: ({isOfflineSocket}) => socketStore.setState({ isOfflineSocket }),
  setInfoNoConnectServer: (info) => socketStore.setState(state => ({ infoNoConnectServer: { ...state.infoNoConnectServer, ...info } })),
  setIsDisableConnectSocket: ({isDisableConnectSocket}) => socketStore.setState({ isDisableConnectSocket }),
};

export const socketSelectors = {
  getStatusConnectSocket: (state: InitialStateProps) => state.statusConnect,
  getStatusIsReConnectSocket: (state: InitialStateProps) => state.isReConnectSocket,
  getIsOfflineSocket: (state: InitialStateProps) => state.isOfflineSocket,
  getInfoNoConnectServer: (state: InitialStateProps) => state.infoNoConnectServer,
  getIsDisableConnectSocket: (state: InitialStateProps) => state.isDisableConnectSocket,
};



export const useSocketSelector = <TSelected>(selector: (state: InitialStateProps) => TSelected ): TSelected => socketStore(selector);
