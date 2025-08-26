import React, { type FC } from "react";
import { useSocketSelector } from '../../store/socket.store';
import { socketActions, socketSelectors } from '../../store/socket.store';


export interface ButtonActionsProps {
  setDisableConnectSocket: () => void
}
export interface ReConnectButtonProps {
  children: (actions: ButtonActionsProps) => React.ReactNode
}

const ReConnectButtonMemo:FC<ReConnectButtonProps> = ({children}) => {
  const isDisableConnectSocket = useSocketSelector(socketSelectors.getIsDisableConnectSocket);

  
  const setDisableConnectSocket = () => {
    socketActions.setIsDisableConnectSocket({isDisableConnectSocket: false});
  }
  return (
    <>
      { isDisableConnectSocket && ( children({ setDisableConnectSocket }) ) }
    </>

  )
};

export const ReConnectButton = React.memo(ReConnectButtonMemo);
