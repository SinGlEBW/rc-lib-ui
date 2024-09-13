import { forwardRef, memo } from 'react';
import s from './Cube.module.scss'
import cn from 'classnames';
import { Box } from '@mui/material';

export interface CubeProps {
  color?:string;
}

const CubeMemo = forwardRef<HTMLDivElement, CubeProps>(({color = 'primary'}, ref) => {
  const _color = color.startsWith('#') ? color : `${color}.main`;
  return (
    <div className={s.wrap} ref={ref}>
        <div className={s.loader}>
          <Box sx={{'&::before': { backgroundColor: _color} }} className={cn(s.cube, s.one)}></Box>
          <Box sx={{'&::before': { backgroundColor: _color} }} className={cn(s.cube, s.two)}></Box>
          <Box sx={{'&::before': { backgroundColor: _color} }} className={cn(s.cube, s.four)}></Box>
          <Box sx={{'&::before': { backgroundColor: _color} }} className={cn(s.cube, s.three)}></Box>
        </div>
    </div>
  );
});

export const Cube = memo(CubeMemo);




