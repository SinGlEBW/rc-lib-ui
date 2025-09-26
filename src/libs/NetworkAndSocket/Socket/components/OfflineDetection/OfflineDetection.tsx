import { SxProps, type CollapseProps } from '@mui/material';
import React, { type FC } from "react";
import cn from 'classnames';

import { useSocketSelector } from '../../store/socket.store';
import { socketSelectors } from '../../store/socket.store';
import { SocketCollapse } from '../ui/CollapseCustom';
import { styled } from '@mui/material'

interface StyledOfflineCollapseProps extends CollapseProps{ }

const StyledOfflineCollapse = styled(SocketCollapse, {
  shouldForwardProp: (propName) => ![''].includes(propName as string),
})<StyledOfflineCollapseProps>(({ theme }) => ({
  bottom: '100%',
  backgroundColor: 'error.light',
  backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0))',
  '& .MuiCollapse-wrapper': {},
  '& span': {
    padding: '1px 10px',
  }
}))


export interface SocketOfflineDetectionPayloadProps {
  isDisableConnectSocket: boolean
}

export interface SocketOfflineDetectionProps extends Omit<StyledOfflineCollapseProps, 'children'> {
  children?: (payload: SocketOfflineDetectionPayloadProps) => React.ReactNode
  isNetwork: boolean;

}

const OfflineDetectionMemo: FC<SocketOfflineDetectionProps> = ({ children, className, isNetwork, ...props }) => {
  const isOfflineSocket = useSocketSelector(socketSelectors.getIsOfflineSocket);
  // const isNetworkStatus = useNetworkSelector(networkSelectors.getNetworkStatus);
  const isDisableConnectSocket = useSocketSelector(socketSelectors.getIsDisableConnectSocket);

  const is = isOfflineSocket || !Boolean(isNetwork);
  const titleOffline = 'Оффлайн';
  // debugger
  return (
    <StyledOfflineCollapse
      in={is}
      className={cn("socket-offline", className)}
      {...props}
    >
      {
        typeof children == 'function'
          ? children({ isDisableConnectSocket })
          : isDisableConnectSocket ? `Режим ${titleOffline}` : titleOffline
      }
    </StyledOfflineCollapse>
  )
};

export const OfflineDetection = React.memo(OfflineDetectionMemo);
