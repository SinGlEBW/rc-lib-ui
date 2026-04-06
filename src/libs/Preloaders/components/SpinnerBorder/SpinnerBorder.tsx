import React from 'react';
import { Box, type BoxProps, type SxProps, type Theme } from '@mui/material';
import cn from 'classnames';
import { forwardRef, memo } from 'react';
import s from './SpinnerBorder.module.scss';
import { styled } from '@mui/material'

export type StringProps_OR = 'className' | 'classNameBody' | 'text';

export interface SpinnerBorderProps extends Partial<Record<StringProps_OR, string>> {
  bgColor?: string;
  size?: number;
  sx?: SxProps<Theme>;
  textPosition?: 'top' | 'bottom' | 'left' | 'right';
}




export interface StyledInnerProps extends Pick<SpinnerBorderProps, 'textPosition'> { }

const StyledInner = styled(
  forwardRef<HTMLDivElement, BoxProps>(({ className, ...props }, ref) => (
    <Box ref={ref} className={cn('StyledInner', className)} {...props} />
  )),
  {
    shouldForwardProp: (propName) => !['textPosition'].includes(propName as string),
  })<StyledInnerProps>(({ theme, textPosition = 'right' }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...(['top', 'bottom'].includes(textPosition) && {
      flexDirection: 'column',
      ...(textPosition === 'top' && {
        '& .SpinnerBorder': { order: 1 },
        '& .SpinnerBorder-Text': { marginBottom: theme.spacing(1) },
      }),
      ...(textPosition === 'bottom' && {
        '& .SpinnerBorder-Text': { marginTop: theme.spacing(1) },
      })
    }),
    ...(['left'].includes(textPosition) && {
      '& .SpinnerBorder': { order: 1 },
    }),
    ...(textPosition === 'left' && {
       '& .SpinnerBorder-Text': { marginRight: theme.spacing(1) },
    }),
    ...(textPosition === 'right' && {
       '& .SpinnerBorder-Text': { marginLeft: theme.spacing(1) },
    })
  }))


const SpinnerBorderMemo = forwardRef<HTMLDivElement, SpinnerBorderProps>(({ sx = {}, textPosition = "right", bgColor = 'primary', size = 16, className, classNameBody, text = '' }, ref) => {
  const color = bgColor.startsWith('#') ? bgColor : `${bgColor}.main`;
  return (
    <Box className={cn(s.wrap, className)} sx={{ color, ...sx }} ref={ref} >
      <StyledInner textPosition={textPosition}>
        <Box className={cn('SpinnerBorder', `${s.spinner} ${s.spinnerSm}`, classNameBody)}
          sx={{ width: size, height: size }}
        />
        {
          text && (
            <Box className={cn('SpinnerBorder-Text')} component={'p'} >{text}</Box>
          )
        }
      </StyledInner>
    </Box>
  );
});

export const SpinnerBorder = memo(SpinnerBorderMemo);


