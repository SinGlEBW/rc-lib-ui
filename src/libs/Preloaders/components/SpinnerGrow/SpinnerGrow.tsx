import React from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import { forwardRef, memo } from 'react';
import s from './SpinnerGrow.module.scss';
import cn from 'classnames';

export interface SpinnerGrowProps {
  className?: string;
  bgColor?: string;
  sx?: SxProps<Theme>;
}


const SpinnerGrowMemo = forwardRef<HTMLDivElement, SpinnerGrowProps>(({ sx, className, bgColor = 'primary' }, ref) => {
  const color = bgColor.startsWith('#') ? bgColor : `${bgColor}.main`
  return (
    <Box sx={sx} className={cn(className, 'SpinnerGrow', s.positionCenterByParent)} ref={ref}>
      <Box className={`${s['spinner-grow']} `} bgcolor={color} role="status"></Box>
    </Box>
  );
});

export const SpinnerGrow = memo(SpinnerGrowMemo);

