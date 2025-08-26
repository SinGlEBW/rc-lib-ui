import React, { forwardRef, memo } from 'react';
import s from "./RotateCube.module.scss"
import cn from 'classnames';
import { Box, styled, type SxProps, type Theme } from '@mui/material';

export interface RotateCubeProps {
  isCircle?: boolean;
  sx?: SxProps<Theme>;
  size?: number;
  variant?: 'spread' | 'nearby'
  textPosition?: 'top' | 'bottom';
  text?: string;
}

interface BoxInnerProps { sizeInner: number }
const BoxInner = styled(Box, { shouldForwardProp: (prop) => !['sizeInner'].includes(prop as string) })<BoxInnerProps>(({ sizeInner }) => ({
  width: sizeInner,
  height: sizeInner,
}))


interface BoxItemProps { sizeItem: number, spread: number, nameItem: 'one' | 'two' | 'three' | 'four' }
type GetPropsItem = Pick<BoxItemProps, 'sizeItem' | 'spread'>


const getProps_One = ({ sizeItem, spread }: GetPropsItem) => {
  const animationName = 'oneAnim';
  return {
    [`@keyframes ${animationName}`]: {
      '0%, 100%': { transform: 'translate(0, 0)' },
      '25%': { transform: `translate(0, ${sizeItem + spread}px)` },
      '50%': { transform: `translate(${sizeItem + spread}px, ${sizeItem + spread}px)` },
      '75%': { transform: `translate(${sizeItem + spread}px, 0)` }
    },
    backgroundColor: '#FA5667',
    top: 0,
    left: 0,
    zIndex: 1,
    animationName
  }
}


const getProps_Two = ({ sizeItem, spread }: GetPropsItem) => {
  const animationName = 'twoAnim';
  return {
    [`@keyframes ${animationName}`]: {
      '0%, 100%': { transform: 'translate(0, 0)' },
      '25%': { transform: `translate(-${sizeItem + spread}px, 0)` },
      '50%': { transform: `translate(-${sizeItem + spread}px, ${sizeItem + spread}px)` },
      '75%': { transform: `translate(0, ${sizeItem + spread}px)` }
    },
    backgroundColor: '#7A45E5',
    top: 0,
    right: 0,
    animationName
  }
}

const getProps_Three = ({ sizeItem, spread }: GetPropsItem) => {
  const animationName = 'threeAnim';
  return {
    [`@keyframes ${animationName}`]: {
      '0%, 100%': { transform: 'translate(0, 0)' },
      '25%': { transform: `translate(0, -${sizeItem + spread}px)` },
      '50%': { transform: `translate(-${sizeItem + spread}px, -${sizeItem + spread}px)` },
      '75%': { transform: `translate(-${sizeItem + spread}px, 0)` }
    },
    backgroundColor: '#1B91F7',
    bottom: 0,
    right: 0,
    zIndex: 1,
    animationName
  }
}

const getProps_Four = ({ sizeItem, spread }: GetPropsItem) => {
  const animationName = 'fourAnim';
  return {
    [`@keyframes ${animationName}`]: {
      '0%, 100%': { transform: 'translate(0, 0)' },
      '25%': { transform: `translate(${sizeItem + spread}px, 0)` },
      '50%': { transform: `translate(${sizeItem + spread}px, -${sizeItem + spread}px)` },
      '75%': { transform: `translate(0, -${sizeItem + spread}px)` }
    },
    backgroundColor: '#FAC24C',
    bottom: 0,
    left: 0,
    zIndex: 1,
    animationName
  }
}



const BoxItem = styled(
  Box,
  {
    shouldForwardProp: (prop) => !['sizeItem', 'spread', 'nameItem'].includes(prop as string)
  }
)<BoxItemProps>(({ sizeItem, nameItem, spread }) => ({
  width: sizeItem,
  height: sizeItem,
  animationDuration: '1.8s',
  animationTimingFunction: 'cubic-bezier(.6,.01,.4,1)',
  animationIterationCount: 'infinite',
  ...(nameItem === 'one' && getProps_One({ sizeItem, spread })),
  ...(nameItem === 'two' && getProps_Two({ sizeItem, spread })),
  ...(nameItem === 'three' && getProps_Three({ sizeItem, spread })),
  ...(nameItem === 'four' && getProps_Four({ sizeItem, spread })),

}))
// animation: oneAnim 1.8s cubic-bezier(.6,.01,.4,1) infinite;






const RotateCubeMemo = forwardRef<HTMLDivElement, RotateCubeProps>(({ textPosition = 'bottom', text, isCircle = false, variant = 'nearby', size = 50, sx }, ref) => {
  // const _color = color.startsWith('#') ? color : `${color}.main`;
  const sizeItem = size / 2;
  const spread = variant === 'spread' ? 20 : 0;//spread в пикселях
  return (
    <Box sx={sx} className={cn('RotateCube', s.wrap)} ref={ref} >
      <BoxInner sizeInner={size} className={cn('RotateCube-Inner', s.inner)}
        sx={{ [`& .${s.item}`]: { borderRadius: isCircle ? '50%' : '0' } }}
      >
        <Box className={s.loader}>
          <BoxItem sizeItem={sizeItem} spread={spread} nameItem='one'
            className={cn('RotateCube-Item', s.item, s.one)} />
          <BoxItem sizeItem={sizeItem} spread={spread} nameItem='two'
            className={cn('RotateCube-Item', s.item, s.two)} />
          <BoxItem sizeItem={sizeItem} spread={spread} nameItem='three'
            className={cn('RotateCube-Item', s.item, s.three)} />
          <BoxItem sizeItem={sizeItem} spread={spread} nameItem='four'
            className={cn('RotateCube-Item', s.item, s.four)} />
        </Box>
        {
          text && (
            <Box sx={{ order: textPosition === 'top' ? 0 : 1 }} component={'p'} className={s.text}>
              {text}
            </Box>
          )
        }
      </BoxInner>
    </Box>
  );
});

export const RotateCube = memo(RotateCubeMemo);