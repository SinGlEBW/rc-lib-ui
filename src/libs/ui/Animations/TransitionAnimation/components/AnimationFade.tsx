import React, { FC } from "react"
import { Fade, FadeProps } from '@mui/material';

export interface AnimationFadeProps extends FadeProps { }

const AnimationFadeMemo: FC<AnimationFadeProps> = (props) => {
  return (
    <Fade in={true} timeout={300} {...props}/>
  )
};

export const AnimationFade = React.memo(AnimationFadeMemo);
