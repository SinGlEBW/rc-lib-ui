import cn from 'classnames';
import React, { type FC } from "react";
import type { SxProps } from '@mui/material';
import { useNetworkSelector, networkSelectors } from '../../store/network.store';
import { Box } from '@mui/system';
import s from './Render.module.css';
import { useNetworkDetection, type UseNetworkDetectionProps } from '../../hooks/useNetworkDetection';


export interface NetworkWatcherRenderProps extends UseNetworkDetectionProps{
  isTitle?: boolean;
  // position?: 'bottom' | 'top';
  className?: string;
  sxTitle?:SxProps;
  sxItem?:SxProps;
  sx?:SxProps;
}
//INFO: Доработать



const NetworkWatcherRenderMemo: FC<NetworkWatcherRenderProps> = ({ className = '', isTitle = true, sxTitle, sx, sxItem, isNetwork, getStatus, ...props }) => {
  useNetworkDetection({ isNetwork,  getStatus});
  const { online, offline, action, titleOnline = 'В сети', titleOffline = 'Нет сети' } = useNetworkSelector(networkSelectors.getInfoNetworkStatus);
 
  return (
    <Box className={cn(s.watcher, className)} sx={sx} >
      <Box className={cn(s.watcherItem, `bg-gradient bg-danger text-white`, { [`${s.active}`]: offline })} sx={sxItem}>
        <RenderTitle isTitle={isTitle} title={titleOffline} sxTitle={sxTitle}/>
      </Box>{/*offline-message*/}
      <Box className={cn(s.watcherItem, `bg-gradient bg-success text-white`, { [`${s.active}`]: online })} sx={sxItem}>
        <RenderTitle isTitle={isTitle} title={titleOnline} sxTitle={sxTitle}/>
      </Box>{/*online-message*/}
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