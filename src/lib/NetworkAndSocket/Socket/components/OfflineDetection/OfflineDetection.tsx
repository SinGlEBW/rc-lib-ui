import { SxProps } from '@mui/material';
import React, { type FC } from "react";

import { useSocketSelector } from '../../store/socket.store';
import { socketSelectors } from '../../store/socket.store';
import { SocketCollapse } from '../ui/CollapseCustom';
import { networkSelectors, useNetworkSelector } from '@lib/NetworkAndSocket/Network/store/network.store';
import cn from 'classnames';

const ds = {
  callapse: {
    top: '100%',
    bgcolor: 'danger.main',
    '& .MuiCollapse-wrapper': {

    },
  } as SxProps,
}

export interface SocketOfflineDetectionPayloadProps {
  isDisableConnectSocket: boolean
}

export interface SocketOfflineDetectionProps {
  sx?:SxProps;
  className?: string
  children: (payload: SocketOfflineDetectionPayloadProps) => React.ReactNode
}

const OfflineDetectionMemo:FC<SocketOfflineDetectionProps> = ({children, className}) => {
  const isOfflineSocket = useSocketSelector(socketSelectors.getIsOfflineSocket);
  const isNetworkStatus = useNetworkSelector(networkSelectors.getNetworkStatus);
  const isDisableConnectSocket = useSocketSelector(socketSelectors.getIsDisableConnectSocket);

  const is = isOfflineSocket || !Boolean(isNetworkStatus);

  return (
    <SocketCollapse
      in={is as boolean}
      sx={{...ds.callapse}}
      className={cn("socket-offline bg-gradient bg-danger", className)}
      itemSpan={{ sx: { padding: '1px 10px' } }}
    >
      {children({ isDisableConnectSocket })}
      {/* {isDisableConnectSocket ? `Режим ${titleOffline}` : titleOffline} */}
    </SocketCollapse>
  )
};

export const OfflineDetection = React.memo(OfflineDetectionMemo);
