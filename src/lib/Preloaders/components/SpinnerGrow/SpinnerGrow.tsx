import { Box, type SxProps } from '@mui/material';
import { forwardRef, memo } from 'react';
import s from './SpinnerGrow.module.scss';


export interface SpinnerGrowProps {
  bgColor?: string;
  sx?: SxProps;
}


const SpinnerGrowMemo = forwardRef<HTMLDivElement, SpinnerGrowProps>(({ sx, bgColor = 'primary' }, ref) => {
  const color = bgColor.startsWith('#') ? bgColor : `${bgColor}.main`
  return (
    <Box sx={sx} className={s.positionCenterByParent} id="preloader" ref={ref}>
      <Box className={`${s['spinner-grow']} `} bgcolor={color} role="status"></Box>
    </Box>
  );
});

export const SpinnerGrow = memo(SpinnerGrowMemo);

