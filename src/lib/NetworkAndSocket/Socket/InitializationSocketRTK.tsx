export {}
// import React, { useEffect, useLayoutEffect } from "react";

// import { SocketApi } from 'dev-classes';
// import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
// import { socketActions, socketSelectors } from '@/shared/store/reducers/socket/socket.store';
// import { offlineSelectors } from '@/shared/store/reducers/offline/offline.store';
// import { SocketRootApi } from '@/shared/store/DAL/SocketQueryApi/SocketRootApi';


// const InitializationSocketRTKMemo = (props) => {
//   const dispatch = useAppDispatch();
//   const { isModal: isModalNoConnectServer } = useAppSelector(socketSelectors.getInfoNoConnectServer);
//   const isReConnectSocket = useAppSelector(socketSelectors.getStatusIsReConnectSocket)
//   const isNetworkStatus = useAppSelector(offlineSelectors.getNetworkStatus);
//   const isDisableConnectSocket = useAppSelector(socketSelectors.getIsDisableConnectSocket);
//   const statusWS = useAppSelector(socketSelectors.getStatusConnectSocket);

//   const [trigger] = SocketRootApi.useConnectMutation()

//   useLayoutEffect(() => {
//     trigger({action: 'connectSocket'})
//     return () => {
//       trigger({action: 'disconnectSocket'})
//     }
//   }, [])

  
// //INFO: Всё что ниже Перенести логику в пакет сокета 
//   useEffect(() => {
//     if(isNetworkStatus && !isDisableConnectSocket) {
//       if (!isModalNoConnectServer && !isReConnectSocket && ['close'].includes(statusWS) ) {
//         //TODO: При смене сети можно добавить снова открытие модалки даже если выбрали оффлайн
//         SocketApi.socketReConnect();
//       }
//     }
//   }, [isDisableConnectSocket, isModalNoConnectServer, isReConnectSocket, statusWS]);

  
//   useEffect(() => {
//     if((isReConnectSocket && (!isNetworkStatus || statusWS === 'ready'))){
//       SocketApi.stopReConnect();
//     }
//   },[isReConnectSocket, isNetworkStatus, statusWS]);

 
//   useEffect(() => {
//     if(isDisableConnectSocket){
//       dispatch(socketActions.setIsOfflineSocket({isOfflineSocket: true}));
//       SocketApi.close();
//     }
//   }, [isDisableConnectSocket])


//   return (
//     <></>
//   )
// };

// export const InitializationSocketRTK = React.memo(InitializationSocketRTKMemo);
