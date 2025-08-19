import type { InitialStateProps } from './socket.types';

const initialState:InitialStateProps = {
  statusConnect: "disconnect",
  isDisableConnectSocket: false,
  isReConnectSocket: false,
  isOfflineSocket: false,
  infoNoConnectServer: {
    isModal: false,
    isSelectOffline: false,//Для того что бы 2й раз окно не показывать
  },
}

const defaultInitialState: typeof initialState = JSON.parse(JSON.stringify(initialState));

export { defaultInitialState, initialState };