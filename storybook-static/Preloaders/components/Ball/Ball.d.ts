import { default as React } from 'react';
import { SxProps } from '@mui/material';
export interface BallProps {
    text?: string;
    textPosition?: 'top' | 'bottom';
    sx?: SxProps;
}
export declare const Ball: React.MemoExoticComponent<React.ForwardRefExoticComponent<BallProps & React.RefAttributes<HTMLDivElement>>>;
