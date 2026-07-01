import { socketActions, socketSelectors, useSocketSelector } from '@libs/NetworkAndSocket/Socket';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { FC, ReactNode } from "react"

export interface ModalReloadAppProps {
  children?: ReactNode;
}

const ModalReloadAppMemo: FC<ModalReloadAppProps> = ({children}) => {

  const { isModal: isModalNoConnectServer, isSelectOffline } = useSocketSelector(socketSelectors.getInfoNoConnectServer);
  const handleReloadApp = () => {
    console.dir('Нажата handleReloadApp');
    window.location.reload();//В мобиле это возможно приводит к краху
    socketActions.setInfoNoConnectServer({ isModal: false, isSelectOffline: false });
  }

  const handleReConnect = () => {
    console.dir('Нажата handleReConnect');
    socketActions.setInfoNoConnectServer({ isModal: false, isSelectOffline: false });

  }

  const resetStatusIsReload = () => {
    console.dir('Нажата resetStatusIsReload');
    /* isSelectOffline - для контроля последующих выводов окна. Не путать с isOfflineSocket */
    socketActions.setInfoNoConnectServer({ isModal: false, isSelectOffline: true });
    socketActions.setIsDisableConnectSocket({ isDisableConnectSocket: true });
  }

  return (
    <Dialog open={isModalNoConnectServer && !isSelectOffline} >
      <DialogTitle id="dialog-title">
        Уведомление
      </DialogTitle>
      <DialogContent className='w-100'>
        <h5>На сервере происходят технические работы.</h5>
        <p>Для продолжения выберите один из предложенных вариантов.</p>
        <DialogActions className='d-flex flex-column justify-content-center'>
          <Button className='mb-3' color='success' onClick={handleReloadApp}>Перезагрузить приложение</Button>
          <Button className='mb-3' onClick={handleReConnect}>Попробовать переподключиться</Button>
          <Button onClick={resetStatusIsReload}>Остаться в оффлайн</Button>
          {children}
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
};

export const ModalReloadApp = React.memo(ModalReloadAppMemo);