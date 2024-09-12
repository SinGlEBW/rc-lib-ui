import { Box } from '@mui/material';
import { forwardRef, memo } from 'react';
import s from './SpinnerGrow.module.scss';


export interface SpinnerGrowProps {
  bgColor?: string;
}


const SpinnerGrowMemo = forwardRef<HTMLDivElement, SpinnerGrowProps>(({ bgColor = 'primary' }, ref) => {
  const color = bgColor.startsWith('#') ? bgColor : `${bgColor}.main`
  return (
    <Box className={s.positionCenterByParent} id="preloader" ref={ref}>
      <Box className={`${s['spinner-grow']} `} bgcolor={color} role="status"></Box>
    </Box>
  );
});

export const SpinnerGrow = memo(SpinnerGrowMemo);

