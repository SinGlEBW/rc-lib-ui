import type { InitialStatePropsSocket } from './socket.types';

const initialState:InitialStatePropsSocket = {
  statusConnect: "disconnect",
  isOfflineSocket: false, //Текущее состояние сокета. Зависит от события timeOffReConnect и если задаёться isDisableConnectSocket: true
  isDisableConnectSocket: false,
  isReConnectSocket: false,
  infoNoConnectServer: {
    isModal: false,
    isSelectOffline: false,//Для того что бы 2й раз окно не показывать
  },
}

const defaultInitialState: typeof initialState = JSON.parse(JSON.stringify(initialState));

export { defaultInitialState, initialState };
