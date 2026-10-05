import React, { FC, useRef } from "react";
import { SwitchTransition } from "react-transition-group";

import { SpinnerGrow, SpinnerGrowProps } from './components/SpinnerGrow/SpinnerGrow';
import { SpinnerBorder, SpinnerBorderProps } from './components/SpinnerBorder/SpinnerBorder';
import { Spinner3D, Spinner3DProps } from './components/Spinner3D/Spinner3D';
import { Ball, BallProps } from './components/Ball/Ball';
import { Time, type TimeProps, } from './components/Time/Time';
import { Cube, CubeProps } from './components/Cube/Cube';
import { RotateCube, RotateCubeProps } from './components/RotateCube/RotateCube';
import { TransitionAnimationsOne, type TransitionAnimationsOneProps } from '@libs/ui/Animations';
import cn from 'classnames';

const PreloaderComponents = {
  SpinnerGrow,
  SpinnerBorder,
  Spinner3D,
  Ball,
  Time,
  Cube,
  RotateCube
};

type ListPreloaders_P =
  ({ name: 'SpinnerGrow' } & SpinnerGrowProps) |
  ({ name: 'SpinnerBorder' } & SpinnerBorderProps) |
  ({ name: 'Spinner3D' } & Spinner3DProps) |
  ({ name: 'Ball' } & BallProps) |
  ({ name: 'Time' } & TimeProps) |
  ({ name: 'Cube' } & CubeProps) |
  ({ name: 'RotateCube' } & RotateCubeProps);

type WatcherAnimation = Pick<TransitionAnimationsOneProps, 'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'>
type OmitUnion<T, K extends string> = T extends any ? Omit<T, K> : never;//Использовать вместо обычного Omit что бы не пропадали свойства

export type PreloadersProps = {
  timeout?: number;
  show: boolean;
  children?: React.ReactNode;

} & WatcherAnimation & {
  slotProps?: {
    transition?: Partial<Pick<TransitionAnimationsOneProps, 'animation' | 'sx' | 'className' | 'appear'>>
    preloader?: Partial<ListPreloaders_P>
  }
};

const PreloadersMemo: FC<PreloadersProps> = ({
  timeout = 250, 
  show,  
  children = null,
  slotProps,
  onEnter, onEntering, onEntered, onExit, onExiting, onExited,
}) => {
  const { name: preloaderName, className: classNamePreloader, ...otherPtopsPreloader } = slotProps?.preloader || {};
  const PreloaderComponent = PreloaderComponents[preloaderName || 'SpinnerBorder'];
  const isDefaultSizeSpinnerBorder = !preloaderName;

  const { animation: animationTransition, className: classNameTransition, sx: transitionPropsSx, appear } = slotProps?.transition || {};

  const switchData = show
    ? { key: 'preloader', element: <PreloaderComponent {...isDefaultSizeSpinnerBorder && { size: 30 }} className={cn("PreloaderComponent", classNamePreloader)} {...otherPtopsPreloader as any} /> }
    : { key: 'content', element: children };
// debugger
  return (
    <SwitchTransition mode="out-in" >
      <TransitionAnimationsOne
        className={cn("Preloaders", classNameTransition)}
        key={switchData.key}
        animation={animationTransition || `fade`}
        timeout={timeout}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        unmountOnExit
        appear={appear}
        sx={{position: 'relative', flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', ...transitionPropsSx}}
      >
        {switchData.element}
      </TransitionAnimationsOne>
    </SwitchTransition>

    // <SwitchTransition mode='out-in'>
    //   <CSSTransition
    //     key={switchData.key}
    //     nodeRef={preloaderRef}
    //     timeout={timeout}

    //     classNames={{
    //       enter: s.fadeEnter,
    //       enterActive: s.fadeEnterActive,
    //       exit: s.fadeExit,
    //       exitActive: s.fadeExitActive,
    //     }}
    //     unmountOnExit
    //     onEnter={onEnter}
    //     onEntering={onEntering}
    //     onEntered={onEntered}
    //     onExit={onExit}
    //     onExiting={onExiting}
    //     onExited={onExited}
    //   >
    //     {switchData.element}
    //   </CSSTransition>
    // </SwitchTransition>
  );
};

export const Preloaders = React.memo(PreloadersMemo);

