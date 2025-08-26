import { SxProps } from '@mui/material';
import React, { type FC } from "react";
import cn from 'classnames';

import { useSocketSelector } from '../../store/socket.store';
import { socketSelectors } from '../../store/socket.store';
import { SocketCollapse } from '../ui/CollapseCustom';


const ds = {
  callapse: {
    // top: '100%',
    bottom: '100%',
    bgcolor: 'danger.main',
    '& .MuiCollapse-wrapper': {

    },
  } as SxProps,
}

export interface SocketOfflineDetectionPayloadProps {
  isDisableConnectSocket: boolean
}

export interface SocketOfflineDetectionProps {
  sx?: SxProps;
  className?: string
  children: (payload: SocketOfflineDetectionPayloadProps) => React.ReactNode
  isNetwork: boolean;
}
/*
  INFO: Нет интернета или включён isOfflineSocket отображает плашку.
*/
//INFO: Проверить обновление компонента
const OfflineDetectionMemo: FC<SocketOfflineDetectionProps> = ({ children, className, isNetwork }) => {
  const isOfflineSocket = useSocketSelector(socketSelectors.getIsOfflineSocket);
  // const isNetworkStatus = useNetworkSelector(networkSelectors.getNetworkStatus);
  const isDisableConnectSocket = useSocketSelector(socketSelectors.getIsDisableConnectSocket);

  const is = isOfflineSocket || !Boolean(isNetwork);
  const titleOffline = 'Оффлайн';
  // debugger
  return (
    <SocketCollapse
      in={is}
      sx={{ ...ds.callapse }}
      className={cn("socket-offline bg-gradient bg-danger", className)}
      itemSpan={{
        sx: {
          padding: '1px 10px',
          // color: '#fff',
          // display: 'flex',
          // alignItems: 'center',
          // borderRadius: '3px 3px 3px 3px'
        }
      }}
    >
      {/* {children({ isDisableConnectSocket })} */}
      {isDisableConnectSocket ? `Режим ${titleOffline}` : titleOffline}
    </SocketCollapse>
  )
};

export const OfflineDetection = React.memo(OfflineDetectionMemo);
