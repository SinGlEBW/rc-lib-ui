import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { useInteractiveMessage, InteractiveMessageProvider } from '@libs/ControlCards';
import React, { FC, ReactNode } from "react"
import uuidv4 from 'uuid4';

export interface AlertsProps {
  children?: ReactNode;
}

const AlertsMemo: FC<AlertsProps> = ({ children }) => {
  const { showAlert, removeMessage } = useInteractiveMessage();
  const setAlert = () => {
    showAlert({

      message: 'asdsadsads',
      // variant: 'success',
      animation: 'Fade' //| 'Grow' | 'Zoom' | 'Slide';
    })
  }
  return (
    <>
      <StyledButtonDefault color='success' onClick={setAlert}>Добавить алерт</StyledButtonDefault>
      {children}
    </>
  )
};

export const Alerts = React.memo(AlertsMemo);
