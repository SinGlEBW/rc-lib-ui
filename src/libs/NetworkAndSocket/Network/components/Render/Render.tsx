import cn from 'classnames';
import React, { type FC } from "react";
import type { SxProps } from '@mui/material';
import { useNetworkSelector, networkSelectors } from '../../store/network.store';
import { Box } from '@mui/system';
import s from './Render.module.css';
import { useNetworkDetection, type UseNetworkDetectionProps } from '../../hooks/useNetworkDetection';
import { StyledNetworkOffline, StyledNetworkOnline } from './Render.styled';
import type { BoxProps } from '@mui/material';


export interface NetworkWatcherRenderProps extends UseNetworkDetectionProps{
  isTitle?: boolean;
  // position?: 'bottom' | 'top';
  className?: string;
  sxTitle?:SxProps;
  slotProps?: {
    offline?: Omit<BoxProps, 'className'>;
    online?: Omit<BoxProps, 'className'>;
  };
  sx?:SxProps;
}
//INFO: Доработать



const NetworkWatcherRenderMemo: FC<NetworkWatcherRenderProps> = ({ className = '', isTitle = true, sxTitle, sx, slotProps, isNetwork, getStatus, ...props }) => {
  useNetworkDetection({ isNetwork,  getStatus});
  const { online, offline, action, titleOnline = 'В сети', titleOffline = 'Нет сети' } = useNetworkSelector(networkSelectors.getInfoNetworkStatus);

  return (
    <Box className={cn(s.watcher, className)} sx={sx} >
      <StyledNetworkOffline className={cn(s.watcherItem, { [`${s.active}`]: offline })} {...slotProps?.offline}>
        <RenderTitle isTitle={isTitle} title={titleOffline} sxTitle={sxTitle}/>
      </StyledNetworkOffline>{/*offline-message*/}
      <StyledNetworkOnline className={cn(s.watcherItem, { [`${s.active}`]: online })} {...slotProps?.online}>
        <RenderTitle isTitle={isTitle} title={titleOnline} sxTitle={sxTitle}/>
      </StyledNetworkOnline>{/*online-message*/}
    </Box>
  )
};

export const Render = React.memo(NetworkWatcherRenderMemo);


const RenderTitle = ({ isTitle, title, sxTitle }) => {
  return (
    <>
      {isTitle && (
        <Box style={{ marginBottom: 1 }} className={s.watcherItemTitle} sx={sxTitle}>
          <Box component={'span'} className={s.watcherItemTitleSpan}>
            {title}
          </Box>
        </Box>
      )}
    </>
  )
}