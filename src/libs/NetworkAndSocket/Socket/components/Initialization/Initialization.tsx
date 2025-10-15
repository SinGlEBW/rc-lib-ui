import React, { useEffect, type FC } from "react";
import { SocketApi } from '../../api';
import { socketActions, socketSelectors, socketStore, useSocketSelector } from '../../store/socket.store';
// import { networkActions, networkSelectors, useNetworkSelector } from '../Network/store/network.store';

export interface InitializationSocketProps {
  init: Omit<Parameters< typeof SocketApi.init>[0], 'listUrlsCheckConnectNetwork'>//Пока исключил. Запросов на сервер не делаю
  isNetwork: boolean;
  typeNetwork: string;
  onMount?: () => void
  onUnmount?: () => void
}

// function setStateDecorator<S, T>(state: S, setState: Dispatch<SetStateAction<T>>) {
//   return (payload: Partial<S>) => setState((prev) => ({ ...prev, ...payload }));
// }



const InitializationMemo:FC<InitializationSocketProps> = (props) => {
  const { isNetwork, typeNetwork } = props;

  const { isModal: isModalNoConnectServer  } = useSocketSelector(socketSelectors.getInfoNoConnectServer);
  const isReConnectSocket = useSocketSelector(socketSelectors.getStatusIsReConnectSocket)

  // const typeNetwork = useNetworkSelector(networkSelectors.getTypeNetwork);
  // const isNetwork = useNetworkSelector(networkSelectors.getNetworkStatus);

  const isDisableConnectSocket = useSocketSelector(socketSelectors.getIsDisableConnectSocket);
  const statusWS = useSocketSelector(socketSelectors.getStatusConnectSocket);
  // const [state, setState] = useState({
  //   isNetwork: false,
  //   typeNetwork: '',
  // });

  // console.group('Обновлнеие InitializationSocket')
  //   console.log('isModalNoConnectServer:>>',isModalNoConnectServer );
  //   console.log('isReConnectSocket:>>',isReConnectSocket );
  //   console.log('typeNetwork:>>',typeNetwork );
  //   console.log('isNetwork:>>',isNetwork );
  //   console.log('isDisableConnectSocket:>>',isDisableConnectSocket );
  //   console.log('statusWS:>>',statusWS );
  // console.groupEnd()

  


  // const setStateLocal = setStateDecorator(state, setState);

  useEffect(() => {

    SocketApi.init(props.init);        
    typeof props.onMount == 'function' &&  props.onMount();
    // SocketApi.on("network", (info) => { console.log('network: ', info);
      

    // });
    SocketApi.on("status", (status) => {
      const stateSocket = socketStore.getState();
      const { isReadySocket } = stateSocket
   
      if(status !== 'ready' && isReadySocket){
         socketActions.setStatusReady({ isReadySocket: false });
      }
      if(!isReadySocket && status === 'ready'){
        socketActions.setStatusReady({ isReadySocket: true });
      }
      socketActions.setStatusConnectSocket({ statusConnect: status });
    });
  

    SocketApi.on("error", (info) => { console.log('error: ', info); });
    SocketApi.on('reConnect', (status) => { console.log('on"reConnect" (status): ', status);
      const stateSocket = socketStore.getState();
      const { isReConnectSocket, infoNoConnectServer: { isModal:isModalNoConnectServer } } = stateSocket;   
      isReConnectSocket !== status && socketActions.setStatusIsReConnectSocket({isReConnectSocket: status});
      isModalNoConnectServer && status && socketActions.setInfoNoConnectServer({isModal: false});

    });
    SocketApi.on('timeOffReConnect', (info) => {  console.log('timeOffReConnect: ', info);
      socketActions.setIsOfflineSocket({isOfflineSocket: !info.status})
      if (!info.status) {
        const stateSocket = socketStore.getState();
        const { infoNoConnectServer: { isModal:isModalNoConnectServer, isSelectOffline } } = stateSocket;   
        let isModal = false;
        !isModalNoConnectServer && !isSelectOffline && (isModal = true);
        isModal && socketActions.setInfoNoConnectServer({ isModal }) 
      }
    })
    
  
    SocketApi.connect();

    return () => { 
      typeof props.onUnmount == 'function' &&  props.onUnmount();
      console.dir('disconnect');
      SocketApi.disconnect() 
      // SocketApi.destroy();
    };
  },[])


  useEffect(() => {
    if(isNetwork && !isDisableConnectSocket) {
      
      if (!isModalNoConnectServer && !isReConnectSocket && ['close'].includes(statusWS as any) && typeNetwork !== 'none') {
        console.log('Запущен socketReConnect');
        //TODO: При смене сети можно добавить снова открытие модалки даже если выбрали оффлайн
        SocketApi.socketReConnect();
      }
    }
  }, [isDisableConnectSocket, isModalNoConnectServer, isReConnectSocket, statusWS, typeNetwork, isNetwork]);

  
  useEffect(() => {
    if((isReConnectSocket && (!isNetwork || statusWS === 'ready'))){
      console.log('Запущен stopReConnect');
      SocketApi.stopReConnect();
    }
  },[isReConnectSocket, isNetwork, statusWS]);


  useEffect(() => {
    if(isDisableConnectSocket){
      console.log('isDisableConnectSocket: ', isDisableConnectSocket);
      socketActions.setIsOfflineSocket({isOfflineSocket: true});
      SocketApi.close();
    }
  }, [isDisableConnectSocket])

  return null;
};

export const Initialization = React.memo(InitializationMemo);
