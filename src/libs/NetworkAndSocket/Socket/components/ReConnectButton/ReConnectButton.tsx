import React, { type FC } from "react";
import { useSocketSelector } from '../../store/socket.store';
import { socketActions, socketSelectors } from '../../store/socket.store';


export interface ButtonActionsProps {
  setIsDisableConnectSocket: (isDisableConnectSocket: boolean) => void
}
export interface ReConnectButtonProps {
  children: (actions: ButtonActionsProps) => React.ReactNode
}

const ReConnectButtonMemo:FC<ReConnectButtonProps> = ({children}) => {
  const isDisableConnectSocket = useSocketSelector(socketSelectors.getIsDisableConnectSocket);

  const setIsDisableConnectSocket = (isDisableConnectSocket) => {
    socketActions.setIsDisableConnectSocket({isDisableConnectSocket: isDisableConnectSocket});
  }


  return (
    <>
      { isDisableConnectSocket && ( children({ setIsDisableConnectSocket }) ) }
    </>
  )
};

export const ReConnectButton = React.memo(ReConnectButtonMemo);
