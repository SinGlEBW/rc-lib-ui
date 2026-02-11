import { useLongPress, type UseLongPressOptions } from './hooks/useLongPress';
import { Box, type BoxProps } from '@mui/material';
import React from "react";
import cn from 'classnames';

export interface CardDetectionPressProps extends Omit<BoxProps, 'onClick'>, Pick<UseLongPressOptions, 'onLongPress' | 'onClick'> {
  selected: boolean;
  children: React.ReactNode;
  selectMode?: boolean;
  className?: string
}
const CardDetectionPressMemo = ({ onLongPress, onClick, selected, children, className, selectMode }: CardDetectionPressProps) => {
  const { handlers } = useLongPress({ onLongPress, onClick, delay: 300, preventDefault: true });

  return (
    <Box
      className={cn('CardDetectionPress', className)}
      sx={{
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        boxShadow: selected ? '0 4px 20px 0 rgba(25, 118, 210, 0.15)' : 'none',
        ...(selectMode && !selected && {
          opacity: 0.6,
        }),
        '&::before': selected ? {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: 'primary.main',
          borderRadius: '2px 0 0 2px',
          zIndex: 2,
        } : {},

      }}
      {...handlers}
    >
      {children}
    </Box>
  )
}
export const CardDetectionPress = React.memo(CardDetectionPressMemo);
