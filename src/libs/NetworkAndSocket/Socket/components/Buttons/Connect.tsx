import React, { useCallback, type FC } from "react";
import { SocketApi } from '../../api';
import { socketSelectors, useSocketSelector } from '../../store/socket/socket.store';


interface ButtonActionsProps {
  connect: () => void;
  isDisableConnectSocket: boolean;
}
export interface ReConnectButtonProps {
  children: (actions: ButtonActionsProps) => React.ReactNode
}

const ConnectMemo:FC<ReConnectButtonProps> = ({children}) => {
  const isDisableConnectSocket = useSocketSelector(socketSelectors.getIsDisableConnectSocket);
  const connect = useCallback(() => {
    if(isDisableConnectSocket) return;
    SocketApi.connect();
  }, [isDisableConnectSocket])

  return children({ connect, isDisableConnectSocket })
};

export const Connect = React.memo(ConnectMemo);
