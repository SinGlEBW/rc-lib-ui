import { default as React } from 'react';
import { BallProps } from './components/Ball/Ball';
import { SpinnerGrowProps } from './components/SpinnerGrow/SpinnerGrow';
import { SpinnerBorderProps } from './components/SpinnerBorder/SpinnerBorder';
import { Spinner3DProps } from './components/Spinner3D/Spinner3D';
import { TimeProps } from './components/Time/Time';
import { CubeProps } from './components/Cube/Cube';
import { RotateCubeProps } from './components/RotateCube/RotateCube';
type ListPreloaders_P = ({
    name: 'SpinnerGrow';
} & SpinnerGrowProps) | ({
    name: 'SpinnerBorder';
} & SpinnerBorderProps) | ({
    name: 'Spinner3D';
} & Spinner3DProps) | ({
    name: 'Ball';
} & BallProps) | ({
    name: 'Time';
} & TimeProps) | ({
    name: 'Cube';
} & CubeProps) | ({
    name: 'RotateCube';
} & RotateCubeProps);
export type PreloadersProps = {
    show: boolean;
    children: React.ReactNode;
} & ListPreloaders_P;
export declare const Preloaders: React.NamedExoticComponent<PreloadersProps>;
export {};
