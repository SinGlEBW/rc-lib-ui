export type StringProps_OR = 'className' | 'classNameBody' | 'text';
export interface SpinnerBorderProps extends Partial<Record<StringProps_OR, string>> {
    bgColor?: string;
    size?: number;
}
export declare const SpinnerBorder: import('react').MemoExoticComponent<import('react').ForwardRefExoticComponent<SpinnerBorderProps & import('react').RefAttributes<HTMLDivElement>>>;
