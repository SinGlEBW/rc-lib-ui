import React, { forwardRef, type ReactNode } from "react";
import { Box } from '@mui/material';

import s from './Time.module.scss';


export interface TimeProps {
  children?: ReactNode;
  color?: string;
}

const TimeMemo = forwardRef<HTMLDivElement, TimeProps>(({ color = 'primary', children }, ref) => {
  const _color = color.startsWith('#') ? color : `${color}.main`;

  return (
    <Box className={`${s.clockLoader} d-flex flex-column`} ref={ref}>
      <Box
        sx={{
          borderColor: _color,
          ['&:after, &:before']: { backgroundColor: _color }
        }}
        className={s.item}></Box>
      <div className={`${s.clockLoader} ${s.title}`}>{children}</div>
    </Box>
  )
});

export const Time = React.memo(TimeMemo);
