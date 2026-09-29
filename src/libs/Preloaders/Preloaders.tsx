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
type OmitUnion<T, K extends string> = T extends any ? Omit<T, K> : never;
export type PreloadersProps = {
  timeout?: number;
  show: boolean;
  children?: React.ReactNode;

} & OmitUnion<ListPreloaders_P, 'sx'> & WatcherAnimation & {
  slotProps?: {
    transition?: Partial<Pick<TransitionAnimationsOneProps, 'animation' | 'sx'>>
    preloader?: Partial<Pick<ListPreloaders_P, 'sx'>>
  }
};

const PreloadersMemo: FC<PreloadersProps> = ({
  timeout = 300, show, name, children = null,
  slotProps,
  onEnter, onEntering, onEntered, onExit, onExiting, onExited,
  ...props
}) => {
  const PreloaderComponent = PreloaderComponents[name];

  const preloaderProps = slotProps?.preloader || {};
  const transitionProps = slotProps?.transition || {};
  
  const preloaderRef = useRef(null);
  const switchData = show
    ? { key: 'preloader', element: <PreloaderComponent ref={preloaderRef} className="Preloaders" {...props as any} {...preloaderProps} /> }
    : { key: 'content', element: children };

  console.dir(switchData.key);
  return (
    <SwitchTransition mode="out-in">
      <TransitionAnimationsOne
        key={switchData.key}
        animation={`fade`}
        timeout={timeout}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        unmountOnExit
        {...transitionProps}
        sx={{position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column', ...transitionProps?.sx}}
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

