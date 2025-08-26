import { create } from 'zustand';
import { defaultInitialState, initialState } from './socket.initial';
import { InitialStatePropsSocket, type SocketActions, } from './socket.types';



export const socketStore = create<InitialStatePropsSocket>(() => (initialState));


export const socketActions:SocketActions = {
  resetState: () => socketStore.setState(defaultInitialState),
  setStatusConnectSocket: ({statusConnect}) => socketStore.setState({ statusConnect }),
  setStatusIsReConnectSocket: ({isReConnectSocket}) => socketStore.setState({ isReConnectSocket }),
  setIsOfflineSocket: ({isOfflineSocket}) => socketStore.setState({ isOfflineSocket }),
  setInfoNoConnectServer: (info) => socketStore.setState(state => ({ infoNoConnectServer: { ...state.infoNoConnectServer, ...info } })),
  setIsDisableConnectSocket: ({isDisableConnectSocket}) => socketStore.setState({ isDisableConnectSocket }),
};

export const socketSelectors = {
  getStatusConnectSocket: (state: InitialStatePropsSocket) => state.statusConnect,
  getStatusIsReConnectSocket: (state: InitialStatePropsSocket) => state.isReConnectSocket,
  getIsOfflineSocket: (state: InitialStatePropsSocket) => state.isOfflineSocket,
  getInfoNoConnectServer: (state: InitialStatePropsSocket) => state.infoNoConnectServer,
  getIsDisableConnectSocket: (state: InitialStatePropsSocket) => state.isDisableConnectSocket,
};



export const useSocketSelector = <TSelected>(selector: (state: InitialStatePropsSocket) => TSelected ): TSelected => socketStore(selector);
