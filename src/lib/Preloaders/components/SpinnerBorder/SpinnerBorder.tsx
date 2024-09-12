import { Box } from '@mui/material';
import cn from 'classnames';
import { forwardRef, memo } from 'react';
import s from './SpinnerBorder.module.scss';

export type StringProps_OR = 'className' | 'classNameBody' | 'text';

export interface SpinnerBorderProps extends Partial<Record<StringProps_OR, string>> {
  bgColor?: string;
  size?:number
}

const SpinnerBorderMemo = forwardRef<HTMLDivElement, SpinnerBorderProps>(({ bgColor = 'primary', size = 16,  className, classNameBody, text = '' }, ref) => {
  const color = bgColor.startsWith('#') ? bgColor : `${bgColor}.main`;
  
  return (
    <Box className={cn(s.wrap, className)} sx={{ color }}>
      <Box className={cn(`${s.spinner} ${s.spinnerSm}`, classNameBody)} sx={{width: size, height: size }}  ref={ref} ></Box>
      <Box className={cn('SpinnerBorder-Text', s.text)} >{text}</Box>
    </Box>
  );
});

export const SpinnerBorder = memo(SpinnerBorderMemo);


