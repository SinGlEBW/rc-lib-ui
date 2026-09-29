import React, { FC, forwardRef } from "react"
import { Collapse, type BoxProps, CollapseProps } from '@mui/material';

export interface AnimationCollapseProps extends CollapseProps { 
  sx?: BoxProps['sx'];
}

const AnimationCollapseMemo = forwardRef<HTMLDivElement, AnimationCollapseProps>((props, ref) => {
  return (
    <Collapse ref={ref} timeout={300} {...props} />
  )
});

export const AnimationCollapse = React.memo(AnimationCollapseMemo);
