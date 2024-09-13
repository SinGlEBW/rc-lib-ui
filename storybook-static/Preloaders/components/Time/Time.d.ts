import { default as React, ReactNode } from 'react';
export interface TimeProps {
    children?: ReactNode;
    color?: string;
}
export declare const Time: React.MemoExoticComponent<React.ForwardRefExoticComponent<TimeProps & React.RefAttributes<HTMLDivElement>>>;
