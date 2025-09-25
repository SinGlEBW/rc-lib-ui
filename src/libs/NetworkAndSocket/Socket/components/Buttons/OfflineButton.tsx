import React, { useCallback, type FC } from "react";
import { useSocketSelector } from '../../store/socket.store';
import { socketActions, socketSelectors } from '../../store/socket.store';


interface ButtonActionsProps {
  offlineActive: () => void
}
export interface OfflineButtonProps {
  children: (actions: ButtonActionsProps) => React.ReactNode
}

const OfflineButtonMemo:FC<OfflineButtonProps> = ({children}) => {
  const offlineActive = useCallback(() => {
    /* isSelectOffline - для контроля последующих выводов окна. Не путать с isOfflineSocket */
    socketActions.setInfoNoConnectServer({isModal: false, isSelectOffline: true});
    socketActions.setIsDisableConnectSocket({isDisableConnectSocket: true});
  }, [])

  return children({ offlineActive })
};

export const OfflineButton = React.memo(OfflineButtonMemo);
