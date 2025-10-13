import React, { type FC } from 'react';
import { type CollapseProps } from '@mui/material';
import { socketSelectors, useSocketSelector } from '../../store/socket.store';
import { SocketCollapse } from '../ui/CollapseCustom';
import s from './ConnectDetection.module.scss';
import cn from 'classnames';

import { styled } from '@mui/material'

interface StyledSocketDirectionProps extends CollapseProps { }

const StyledSocketDirection = styled(SocketCollapse, {
  shouldForwardProp: (propName) => ![''].includes(propName as string),
})<StyledSocketDirectionProps>(({ theme }) => ({
  top: '100%',
  '& .MuiCollapse-wrapper': {
    height: 10,
  },
  '& span': {
    height: '100%'
  }
}))



export interface SocketConnectDetectionProps extends Omit<StyledSocketDirectionProps, 'children'>{
  text?: string
  className?: string
}
const ConnectDetectionMemo: FC<SocketConnectDetectionProps> = ({ text = 'Происходит подключение к серверу', className, ...props }) => {
  const statusConnectSocket = useSocketSelector(socketSelectors.getStatusConnectSocket);
  const is = statusConnectSocket === 'pending'
  return (
    <StyledSocketDirection
      in={is}
      collapsedSize='1px'
      className={cn(s['connect-server-anim'], className)}
      unmountOnExit
      {...props}
    >
      {text}
    </StyledSocketDirection>
  )
};

export const ConnectDetection = React.memo(ConnectDetectionMemo);
