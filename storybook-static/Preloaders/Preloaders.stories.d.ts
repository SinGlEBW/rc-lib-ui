import { StoryObj } from '@storybook/react';
import { Preloaders } from './Preloaders.tsx';
declare const meta: {
    component: import('react').NamedExoticComponent<import('./Preloaders.tsx').PreloadersProps>;
    decorators: (Preloaders: import('@storybook/csf').PartialStoryFn<import('@storybook/react').ReactRenderer, {
        show: boolean;
        children: React.ReactNode;
        name: "SpinnerGrow";
        bgColor?: string | undefined;
    } | {
        show: boolean;
        children: React.ReactNode;
        name: "SpinnerBorder";
        bgColor?: string | undefined;
        size?: number | undefined;
        text?: string | undefined;
        className?: string | undefined;
        classNameBody?: string | undefined;
    } | {
        show: boolean;
        children: React.ReactNode;
        name: "Spinner3D";
        text?: string | undefined;
        bgColor?: string | undefined;
        color?: string | undefined;
        isBgGradient?: boolean | undefined;
    } | {
        show: boolean;
        children: React.ReactNode;
        name: "Ball";
        text?: string | undefined;
        textPosition?: ("top" | "bottom") | undefined;
        sx?: import('@mui/system').SxProps | undefined;
    } | {
        show: boolean;
        children: React.ReactNode;
        name: "Time";
        color?: string | undefined;
    } | {
        show: boolean;
        children: React.ReactNode;
        name: "Cube";
        color?: string | undefined;
    } | {
        show: boolean;
        children: React.ReactNode;
        name: "RotateCube";
        isCircle?: boolean | undefined;
        sx?: import('@mui/system').SxProps | undefined;
        size?: number | undefined;
        variant?: ("spread" | "nearby") | undefined;
    }>) => import("react/jsx-runtime").JSX.Element;
};
export default meta;
type StoryPreloaders = StoryObj<typeof Preloaders>;
export declare const Bull: StoryPreloaders;
