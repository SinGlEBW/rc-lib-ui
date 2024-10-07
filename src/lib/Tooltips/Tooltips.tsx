import type { TooltipProps } from '@mui/material';
import { Tooltip, styled, tooltipClasses } from '@mui/material';
import React, { FC } from "react";

export interface TooltipsProps extends TooltipProps{
  variant?: 'html' | 'light' | 'bootstrap' | 'default'
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));



const variants = {
  html: HtmlTooltip,
  light: LightTooltip,
  bootstrap: BootstrapTooltip,
  default: Tooltip
}

const TooltipsMemo:FC<TooltipsProps> = ({variant = 'default', ...props}) => {
  const Component = variants[variant];
  return <Component {...props}/>
};

export const Tooltips = React.memo(TooltipsMemo);

