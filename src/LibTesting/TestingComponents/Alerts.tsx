import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { useInteractiveMessage, InteractiveMessageProvider } from '@libs/ControlCards';
import React, { FC, ReactNode } from "react"
import uuidv4 from 'uuid4';

export interface AlertsProps {
  children?: ReactNode;
}



const AlertsMemo: FC<AlertsProps> = ({ children }) => {
  const { showAlert, showModal, removeMessage } = useInteractiveMessage();
  const setAlert = () => {
    showAlert({

      message: 'asdsadsads',
      // variant: 'success',
      variant: 'success',
      animation: 'Fade' //| 'Grow' | 'Zoom' | 'Slide';
    })
  }
  const setModal = () => {
    showModal({

      message: 'asdsadsads',
      // variant: 'success',
      visual: 'variant3',
      mode: "success",
      view: 'modal',
      onCancel: () => { 
        console.dir(2);
       }
    })
  }
  return (
    <>
      <StyledButtonDefault color='success' onClick={setAlert}>Добавить алерт</StyledButtonDefault>
      <StyledButtonDefault color='success' onClick={setModal}>Добавить Modal</StyledButtonDefault>
      {children}
    </>
  )
};

export const Alerts = React.memo(AlertsMemo);
