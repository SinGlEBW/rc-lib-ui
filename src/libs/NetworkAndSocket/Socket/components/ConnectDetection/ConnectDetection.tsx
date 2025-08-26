import React, { type FC } from 'react';
import { SxProps } from '@mui/material';
import { useSocketSelector } from '../../store/socket.store';
import { socketSelectors } from '../../store/socket.store';
import { SocketCollapse } from '../ui/CollapseCustom';
import s from './ConnectDetection.module.scss';
import cn from 'classnames';

const ds = {
  callapse: {
    top: '100%',
    '& .MuiCollapse-wrapper': {
      height: 10,
    },
  } as SxProps,
}

export interface SocketConnectDetectionProps {
  text?: string
  className?: string
}
const ConnectDetectionMemo:FC<SocketConnectDetectionProps> = ({text = 'Происходит подключение к серверу', className}) => {
  const statusConnectSocket = useSocketSelector(socketSelectors.getStatusConnectSocket);
  const is = statusConnectSocket === 'pending'
  return (
    <SocketCollapse
      in={is}
      sx={ds.callapse}
      collapsedSize='1px'
      className={cn(s['connect-server-anim'], className)}
      unmountOnExit
      itemSpan={{ sx: { height: '100%' } }}
    >
      {text}
    </SocketCollapse>
  )
};

export const ConnectDetection = React.memo(ConnectDetectionMemo);
