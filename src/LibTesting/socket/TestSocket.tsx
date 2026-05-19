import { Box, Button, Dialog, FormHelperText } from '@mui/material';
import { SocketApi, socketSelectors, useSocketSelector, Socket, socketActions } from '@libs/NetworkAndSocket/Socket';
import React, { FC, ReactNode, useState } from "react"
import uuid4 from 'uuid4';
import { ModalReloadApp } from './ModalReloadApp';
export interface TestSocketProps {
  children?: ReactNode;
}

const TestSocketMemo: FC<TestSocketProps> = (props) => {
  const [state, setState] = useState({
    socketApiInfo: {},
    infoNetwork: {},
    requestSave: [] as any[],
  });



  const infoNoConnectServer = useSocketSelector(socketSelectors.getInfoNoConnectServer);
  const isDisableConnectSocket = useSocketSelector(socketSelectors.getIsDisableConnectSocket);
  const isOfflineSocket = useSocketSelector(socketSelectors.getIsOfflineSocket);
  const isReConnectSocket = useSocketSelector(socketSelectors.getStatusIsReConnectSocket);
  const statusConnectSocket = useSocketSelector(socketSelectors.getStatusConnectSocket);
  const isReadySocket = useSocketSelector(socketSelectors.getStatusReady);

  const handleConnect = () => {
    SocketApi.connect();
  }
  const handleDisconnect = () => {
    SocketApi.disconnect();
  }
  const handleClose = () => {
    SocketApi.close();
  }
  const handleDestroy = () => {
    SocketApi.destroy();
  }
  const socketReConnect = () => {
    SocketApi.socketReConnect();
  }
  const getStateSocket = () => {
    const socketState = SocketApi.getState();
    const infoNetwork = SocketApi.getInfoNetwork();
    const requestSave = SocketApi.getRequestSave();
    setState((prev) => ({ ...prev, socketApiInfo: socketState, infoNetwork, requestSave }));
  }

  const changeUrl = () => {
   SocketApi.wsApi.setOptions({ url: 'wss://echo.websocket.org', });
  }

  const inputRef = React.useRef<HTMLInputElement>(null);

  const requestSocket = () => {
    const message = inputRef.current?.value || `Promise 1`
    SocketApi.request(
      {
        action: "echo",
        request_id: uuid4(),
        data: { message }
      },
      { timeout: 5000 }
    ).catch(err => ({ error: err.message }))
  }

  (window as any).SocketApi = SocketApi
 



  return (
    <div className='TestSocket'>
      <h4>TestSocket</h4>
      <Box sx={{ p: 1, border: '1px solid #345', m: 1 }}>
        <h4>socketSelectors</h4>
        <pre>infoNoConnectServer: {JSON.stringify(infoNoConnectServer, null, 2)}</pre>
        <pre>isDisableConnectSocket: {JSON.stringify(isDisableConnectSocket)}</pre>
        <pre>isOfflineSocket: {JSON.stringify(isOfflineSocket)}</pre>
        <pre>isReConnectSocket: {JSON.stringify(isReConnectSocket)}</pre>
        <pre>statusConnectSocket: {JSON.stringify(statusConnectSocket)}</pre>
        <pre>isReadySocket: {JSON.stringify(isReadySocket)}</pre>
      </Box>
      <Box sx={{ p: 1, border: '1px solid #345', m: 1 }}>
        <h4>socketApi</h4>
        <pre>socketApiInfo: {JSON.stringify(state.socketApiInfo, null, 2)}</pre>
        <pre>infoNetwork: {JSON.stringify(state.infoNetwork, null, 2)}</pre>
        <pre>requestSave: {JSON.stringify(state.requestSave, null, 2)}</pre>
      </Box>

      <Socket.Initialization
        init={{
          url: 'wss://echo.websocket.org2',
          timeReConnect: 2000,
          numberOfRepit: 2,
          isReConnectNetworkOnline: true,
        }}
      />
    

      <Box>
        <Button onClick={handleConnect}>Connect</Button>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleDisconnect}>Disconnect</Button>
        <Button onClick={handleDestroy}>Destroy</Button>
        <Button onClick={socketReConnect}>SocketReConnect</Button>
      </Box>
      <Box>
        <Button onClick={getStateSocket}>getStateSocket</Button>
        <Socket.Buttons.OfflineActive children={({ offlineActive }) => <Button onClick={offlineActive}>Offline</Button>} />
        <Socket.Buttons.Connect children={({ connect }) => <Button onClick={connect}>connect</Button>} />
        <Socket.Buttons.ReConnect children={({ reConnect }) => <Button onClick={reConnect}>reConnect</Button>} />
        <Button onClick={changeUrl}>Исправить url</Button>
      </Box>
      <Box sx={{ m: 1 }}>
        <input style={{ width: '100%', padding: '10px' }} placeholder="Тестовое сообщение для сокета" ref={inputRef} />
        <Button onClick={requestSocket}>Отправить сообщение</Button>
        <ModalReloadApp children={<Button onClick={changeUrl}>Исправить url</Button>} />
      </Box>

      <div style={{ position: 'relative', width: '100%', height: '100%', top: '100%' }}>
        <Socket.ConnectDetection />
        <Socket.OfflineDetection isNetwork={!isOfflineSocket} />
      </div>
    </div>
  )
};

export const TestSocket = React.memo(TestSocketMemo);




