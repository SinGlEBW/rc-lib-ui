import React, { useEffect, useState, type FC, type Dispatch, type SetStateAction } from "react";
import { SocketApi } from 'lib-socket-api';
import { socketActions, socketSelectors, socketStore, useSocketSelector } from './store/socket.store';

export interface InitializationSocketProps {
  init: Parameters< typeof SocketApi.init>[0]
}

function setStateDecorator<S, T>(state: S, setState: Dispatch<SetStateAction<T>>) {
  return (payload: Partial<S>) => setState((prev) => ({ ...prev, ...payload }));
}
const InitializationSocketMemo:FC<InitializationSocketProps> = (props) => {
  const { isModal: isModalNoConnectServer  } = useSocketSelector(socketSelectors.getInfoNoConnectServer);
  const isReConnectSocket = useSocketSelector(socketSelectors.getStatusIsReConnectSocket)

  // const typeNetwork = useNetworkSelector(networkSelectors.getTypeNetwork);
  // const isNetworkStatus = useNetworkSelector(networkSelectors.getNetworkStatus);

  // const isOfflineSocket = useSocketSelector(getIsOfflineSocket);
  const isDisableConnectSocket = useSocketSelector(socketSelectors.getIsDisableConnectSocket);
  const statusWS = useSocketSelector(socketSelectors.getStatusConnectSocket);
  const [state, setState] = useState({
    isNetwork: false,
    typeNetwork: '',
  });


  console.group('Обновление компонента');
    console.log('isModalNoConnectServer:', isModalNoConnectServer);
    console.log('isReConnectSocket:', isReConnectSocket);
    console.log('isDisableConnectSocket:', isDisableConnectSocket);
    console.log('statusWS:', statusWS);
    console.log('state:', statusWS);
  console.groupEnd()

  const setStateLocal = setStateDecorator(state, setState);

  useEffect(() => {
    SocketApi.init(props.init);        
    SocketApi.on("status", (status) => {
      socketActions.setStatusConnectSocket({ statusConnect: status });
    });
    SocketApi.on("network", (info) => { console.log('network: ', info);
      setStateLocal(info)
    });

    SocketApi.on('reConnect', (status) => { console.log('reConnect', status);
   
      const isReConnectSocket = socketStore(socketSelectors.getStatusIsReConnectSocket);
      const { isModal:isModalNoConnectServer } = socketStore(socketSelectors.getInfoNoConnectServer); 
      isReConnectSocket !== status && socketActions.setStatusIsReConnectSocket({isReConnectSocket: status});
      isModalNoConnectServer && status && socketActions.setInfoNoConnectServer({isModal: false});
    });
    SocketApi.on('timeOffReConnect', (info) => {  console.log('timeOffReConnect: ', info);
      socketActions.setIsOfflineSocket({isOfflineSocket: !info.status})
      if (!info.status) {
        const { isModal: isModalNoConnectServer, isSelectOffline } = socketStore(socketSelectors.getInfoNoConnectServer); 
        let isModal = false;
        !isModalNoConnectServer && !isSelectOffline && (isModal = true);
        isModal && socketActions.setInfoNoConnectServer({ isModal }) 
      }
    })
  
    SocketApi.connect();

    return () => { SocketApi.disconnect() };
  },[])


  useEffect(() => {
    if(state.isNetwork && !isDisableConnectSocket) {
      if (!isModalNoConnectServer && !isReConnectSocket && ['close'].includes(statusWS as any) && state.typeNetwork !== 'none') {
        console.log('Запущен socketReConnect');
        //TODO: При смене сети можно добавить снова открытие модалки даже если выбрали оффлайн
        SocketApi.socketReConnect();
      }
    }
  }, [isDisableConnectSocket, isModalNoConnectServer, isReConnectSocket, statusWS, state]);

  
  useEffect(() => {
    if((isReConnectSocket && (!state.isNetwork || statusWS === 'ready'))){
      console.log('Запущен stopReConnect');
      SocketApi.stopReConnect();
    }
  },[isReConnectSocket, state, statusWS]);


  useEffect(() => {
    if(isDisableConnectSocket){
      console.log('isDisableConnectSocket: ', isDisableConnectSocket);
      socketActions.setIsOfflineSocket({isOfflineSocket: true});
      SocketApi.close();
    }
  }, [isDisableConnectSocket])

  return null;
};

export const InitializationSocket = React.memo(InitializationSocketMemo);
