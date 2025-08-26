import { forwardRef, memo } from 'react';
import s from './Cube.module.scss'
import cn from 'classnames';
import { Box, type SxProps, type Theme } from '@mui/material';

export interface CubeProps {
  color?:string;
  sx?: SxProps<Theme>;
}

const CubeMemo = forwardRef<HTMLDivElement, CubeProps>(({color = 'primary', sx }, ref) => {
  const _color = color.startsWith('#') ? color : `${color}.main`;
  return (
    <Box sx={sx}  className={s.wrap} ref={ref}>
        <div className={s.loader}>
          <Box sx={{'&::before': { backgroundColor: _color} }} className={cn(s.cube, s.one)}></Box>
          <Box sx={{'&::before': { backgroundColor: _color} }} className={cn(s.cube, s.two)}></Box>
          <Box sx={{'&::before': { backgroundColor: _color} }} className={cn(s.cube, s.four)}></Box>
          <Box sx={{'&::before': { backgroundColor: _color} }} className={cn(s.cube, s.three)}></Box>
        </div>
    </Box>
  );
});

export const Cube = memo(CubeMemo);




