import { SxProps } from '@mui/material';
export interface RotateCubeProps {
    isCircle?: boolean;
    sx?: SxProps;
    size?: number;
    variant?: 'spread' | 'nearby';
}
export declare const RotateCube: import('react').MemoExoticComponent<import('react').ForwardRefExoticComponent<RotateCubeProps & import('react').RefAttributes<HTMLDivElement>>>;
