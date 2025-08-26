import React, { forwardRef } from "react";
import { Box, styled, type SxProps, type Theme } from '@mui/material';
import s from './Spinner3D.module.scss';

export interface Spinner3DProps {
  text?: string;
  bgColor?: string;
  color?: string;
  isBgGradient?: boolean;
  sx?: SxProps<Theme>;
}


type BgBoxProps = Pick<Spinner3DProps, 'isBgGradient'>;
const BgBox = styled(
  Box,
  {
    shouldForwardProp: (prop) => !['isBgGradient'].includes(prop as string)
  }
)<BgBoxProps>(
  ({ isBgGradient }) => {
  return {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    ...(isBgGradient && {
      backgroundImage: 'linear-gradient(135deg, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 0.2))',
    }),
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    // transition: 'backgroundColor $trans-dur, color $trans-dur'
  }
})


const Spinner3DMemo = forwardRef<HTMLDivElement, Spinner3DProps>(({ sx = {}, isBgGradient = true, text = '', bgColor = '', color = 'primary' }, ref) => {
  const _bgColor = bgColor.startsWith('#') ? bgColor : `${bgColor}.main`
  const _color = color.startsWith('#') ? color : `${color}.main`

  return (
    <BgBox bgcolor={_bgColor} sx={{ color: _color, ...sx }} ref={ref} isBgGradient={isBgGradient}>
      <div className={s.pl}>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__dot']}></div>
        <div className={s['pl__text']}>{text}</div>
      </div>
    </BgBox>
  )
});

export const Spinner3D = React.memo(Spinner3DMemo);
