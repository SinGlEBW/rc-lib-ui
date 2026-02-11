import { Portal } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { useCallback, useState, type FC } from 'react';

import uuid4 from "uuid4";
import { customAlerts } from './alerts/Alerts.styled';
import { InteractiveMessageContext } from './controls';
import { Dialog } from '@mui/material';
import { ModalsDefault } from './modals/ModalsDefault/ModalsDefault';
import { ModalsDelete } from './modals/ModalsDelete/ModalsDelete';
import { ModalsInfo } from './modals/ModalsInfo/ModalsInfo';
import { ModalsSuccess } from './modals/ModalsSuccess/ModalsSuccess';
import { ModalsUpdate } from './modals/ModalsUpdate/ModalsUpdate';
import {
  InteractiveMessageModalsProps,
  type AddMessageFn,
  type InteractiveMessageAlertProps,
  type InteractiveMessageContextProps,
  type InteractiveMessageControl,
  type InteractiveMessageStateProps
} from './types';
import s from './stylesNotistack.module.css';
import { AnimationAlertNotistack } from './animation';




interface InteractiveMessageProps {
  children: React.ReactNode;
}


const InteractiveMessage: FC<InteractiveMessageProps> = ({ children }) => {
  const [modals, setModals] = useState<(InteractiveMessageModalsProps & InteractiveMessageControl)[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addMessage = (message: InteractiveMessageStateProps) => {
    const id = uuid4();
    if (['modal', 'fullModal'].includes(message.view)) {
      setModals(prev => [...prev, { ...message, id, isExiting: false, } as any]);
    }
  }

  const controlsMessages = useInteractiveModalControls(addMessage as AddMessageFn);

  /*------------------------------------------------------------------------------------------------------*/
  const hideMessage = useCallback((id: string, viewMessage: 'modal' | 'alert') => {
    if (viewMessage === 'alert') {
      closeSnackbar(id);
    }
    if (viewMessage === 'modal') {
      setModals(prev => prev.map(msg => msg.id === id ? { ...msg, isExiting: true } : msg));
    }
  }, []);



  const hideMessageModal = (id: string) => { hideMessage(id, 'modal'); }

  const handleDeleteModal = (id: string) => { setModals(prev => prev.filter(msg => msg.id !== id)); }

  /*------------------------------------------------------------------------------------------------------*/
  const clearAll = useCallback(() => {
    setModals(prev => prev.map((item) => ({ ...item, isExiting: true })));
  }, []);



  const showAlert = useCallback(({ variant, message, ...config }: InteractiveMessageAlertProps) => {
    enqueueSnackbar(message, {
      TransitionComponent: AnimationAlertNotistack[config.animation || 'Slide'],
      variant: config.severity,
      ...(config.timeout && { autoHideDuration: config.timeout }),
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      ...config
    })
  }, []);


  const showAlertDeleteCountdown: InteractiveMessageContextProps['showAlertDeleteCountdown'] = useCallback(
    ({ message, ...props }) => {
      enqueueSnackbar(message, {
        TransitionComponent: AnimationAlertNotistack['Grow'],
        variant: 'deleteCountdown',
        // preventDuplicate: true,//Вырубает дублиирование сообщений
        // autoHideDuration: duration,
        // persist: true,
        autoHideDuration: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        ...props
      });
    }, [enqueueSnackbar]);




  const value = {
    removeMessage: hideMessage,
    clearAll,
    showAlert,
    showAlertDeleteCountdown,
    ...controlsMessages
  };



  return (
    <InteractiveMessageContext.Provider value={value}>
      {children}
      {modals.filter((item) => ['modal', 'fullModal'].includes(item.view!)).map((modal, inx) => {

        return (
          <Portal key={modal.id}>
            <Dialog
              open={!modal.isExiting}
              {...(modal.view == 'fullModal' && { fullWidth: true, fullScreen: true })}

              onClick={(e) => {
                hideMessageModal(modal.id);
              }}

              maxWidth="sm"
              fullWidth
              TransitionProps={{
                onExited: (e) => {
                  if (modal.isExiting) {
                    handleDeleteModal(modal.id);
                  }
                }
              }}
            >

              {modal.mode == 'success' && <ModalsSuccess modal={modal} />}
              {modal.mode == 'delete' && <ModalsDelete modal={modal} />}
              {modal.mode == 'update' && <ModalsUpdate modal={modal} />}
              {modal.mode == 'info' && <ModalsInfo modal={modal} />}
              {modal.mode == 'default' && <ModalsDefault modal={modal} hideMessage={hideMessageModal} />}
            </Dialog>
          </Portal>
        )
      })}

    </InteractiveMessageContext.Provider>
  );
};


interface InteractiveMessageProviderProps {
  children: React.ReactNode;
}

export const InteractiveMessageProvider: FC<InteractiveMessageProviderProps> = (params) => {
  return (
    <SnackbarProvider
      maxSnack={4}
      Components={customAlerts}
      classes={{
        containerRoot: s['notistack-SnackbarContainer']
      }}
    >
      <InteractiveMessage {...params} />
    </SnackbarProvider>
  )
}



const useInteractiveModalControls = (addMessage: AddMessageFn) => {
  //TODO: addMessage можно разделить т.к. свойства алерта и модал вкуче 

  const showModal: InteractiveMessageContextProps['showModal'] = useCallback(({ view, ...config }) => {
    addMessage({
      variant: 'outlined',
      view: view || 'modal',
      dismissible: config.mode !== 'success',
      ...config
    });
  }, [addMessage]);

  const showSuccessModal: InteractiveMessageContextProps['showSuccessModal'] = useCallback(({ title, view, ...config }) => {
    addMessage({
      mode: 'success',//
      severity: 'success',
      view: view || 'modal',
      title: title || 'Успех',
      buttonText: 'OK',
      dismissible: false,
      ...config
    });
  }, [addMessage]);

  const showDeleteModal: InteractiveMessageContextProps['showDeleteModal'] = useCallback(({ view, ...config }) => {

    addMessage({
      mode: 'delete',
      severity: 'error',
      view: view || 'modal',
      confirmText: 'Да',
      cancelText: 'Нет',
      dismissible: true,

      ...config
    });
  }, [addMessage]);

  const showUpdateModal: InteractiveMessageContextProps['showUpdateModal'] = useCallback(({ view, ...config }) => {
    addMessage({
      mode: 'update',
      severity: 'info',
      view: view || 'modal',
      dismissible: false,
      title: 'Информация',

      ...config
    });
  }, [addMessage]);

  return {
    showModal,
    showSuccessModal,
    showDeleteModal,
    showUpdateModal
  };
}