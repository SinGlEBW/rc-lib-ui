import React, { FC, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { Ball, BallProps } from './components/Ball/Ball';
import { SpinnerGrow, SpinnerGrowProps } from './components/SpinnerGrow/SpinnerGrow';
import { SpinnerBorder, SpinnerBorderProps } from './components/SpinnerBorder/SpinnerBorder';
import { Spinner3D, Spinner3DProps } from './components/Spinner3D/Spinner3D';
import { Time, type TimeProps, } from './components/Time/Time';
import { Cube, CubeProps } from './components/Cube/Cube';
import { RotateCube, RotateCubeProps } from './components/RotateCube/RotateCube';

import s from './Preloaders.module.css';

/*Добавлять прелоадеры threeJS */

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


export type PreloadersProps = {
  timeout?: number;
  show: boolean;
  children?: React.ReactNode;
} & ListPreloaders_P;

const PreloadersMemo: FC<PreloadersProps> = ({ timeout = 300, show, name, children = null,  ...props }) => {
  const PreloaderComponent = PreloaderComponents[name];
  // debugger
  const preloaderRef = useRef(null);
  const switchData = show
    ? { key: 'preloader', element: <PreloaderComponent ref={preloaderRef} {...props} /> }
    : { key: 'content', element: <>{children}</> };

  return (
    <SwitchTransition >
      <CSSTransition
        key={switchData.key}
        nodeRef={preloaderRef}
        timeout={timeout}
        classNames={{
          enter: s.fadeEnter,
          enterActive: s.fadeEnterActive,
          exit: s.fadeExit,
          exitActive: s.fadeExitActive,
        }}
        unmountOnExit
      >
        <>
          {switchData.element}
        </>
      </CSSTransition>
    </SwitchTransition>
  );
};

export const Preloaders = React.memo(PreloadersMemo);
