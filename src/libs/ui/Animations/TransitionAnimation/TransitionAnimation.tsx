import React, { FC, ReactNode } from "react"
import { TransitionGroup, } from 'react-transition-group';
import { AnimationCollapse } from './components/AnimationCollapse';
import { AnimationFade } from './components/AnimationFade';


export interface TransitionAnimationProps {
  children?: ReactNode
  style?: React.CSSProperties
  className?: string
}


const TransitionAnimationMemo: FC<TransitionAnimationProps> = (props) => {
  return (
    <TransitionGroup
      component={null}
      {...props}
    />
  )
}

export const TransitionAnimation = Object.assign(TransitionAnimationMemo, {
  Collapse: AnimationCollapse,
  Fade: AnimationFade
});
