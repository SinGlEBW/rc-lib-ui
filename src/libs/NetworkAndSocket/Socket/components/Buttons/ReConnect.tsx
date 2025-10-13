import React, { useCallback, type FC } from "react";
import { socketActions } from '../../store/socket.store';


interface ButtonActionsProps {
  reConnect: () => void
}
export interface ReConnectButtonProps {
  children: (actions: ButtonActionsProps) => React.ReactNode
}

const ReConnectMemo:FC<ReConnectButtonProps> = ({children}) => {
  const reConnect = useCallback(() => {
    socketActions.setInfoNoConnectServer({isModal: false, isSelectOffline: false});
  }, [])

  return children({ reConnect })
};

export const ReConnect = React.memo(ReConnectMemo);
