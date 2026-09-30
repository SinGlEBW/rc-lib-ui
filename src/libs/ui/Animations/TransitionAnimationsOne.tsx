import React, { forwardRef, ReactNode, useCallback, useEffect, useRef, useState, type FC } from 'react';
import { Box, styled, SxProps, Theme, type BoxProps, type CSSObject } from '@mui/material';
import cn from 'classnames';
import { CSSTransition, SwitchTransition, type TransitionStatus } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';


const baseProps: CSSObject = {
  // position: 'fixed',
  // top: 0,
  // left: 0,
  // right: 0,
  // bottom: 0,
  // zIndex: 10,
};

interface FadeContentProps extends BoxProps {
  duration?: number
}
const FadeContent = styled(
  forwardRef<HTMLDivElement, BoxProps>(({ className, sx, ...props }, ref) => (
    <Box ref={ref} className={cn(className, 'animation-fade')} {...props} />
  )),
  {
    shouldForwardProp: (prop) => !['duration', 'isFade'].includes(prop as string)
  })<FadeContentProps>(({ theme, duration = 300 }) => ({
    ...baseProps,
    '&.animation-fade-enter, &.animation-fade-appear': { opacity: 0 },
    '&.animation-fade-enter-active, &.animation-fade-appear-active': {
      opacity: 1,
      transition: theme.transitions.create('opacity', { duration })
    },
    '&.animation-fade-enter-done, &.animation-fade-appear-done': { opacity: 1 },
    '&.animation-fade-exit': { opacity: 1 },
    '&.animation-fade-exit-active': {
      opacity: 0,
      transition: theme.transitions.create('opacity', { duration })
    },
    '&.animation-fade-exit-done': {
      opacity: 0,
    },
  }));


interface GrowContentProps extends BoxProps {
  duration?: number;
  isFade?: boolean;
}
const GrowContent = styled(
  forwardRef<HTMLDivElement, BoxProps>(({ className, sx, ...props }, ref) => (
    <Box ref={ref} className={cn(className, 'animation-slide-grow')} {...props} />
  )),
  {
    shouldForwardProp: (prop) => !['duration', 'isFade'].includes(prop as string)
  })<GrowContentProps>(({ theme, isFade, duration = 300 }) => ({
    ...baseProps,
    '&.animation-grow-enter, &.animation-grow-appear': {
      ...(isFade && { opacity: 0 }),
      transform: 'scale(0.8)'
    },
    '&.animation-grow-enter-active, &.animation-grow-appear-active': {
      ...(isFade && { opacity: 1 }),
      transform: 'scale(1)',
      transition: theme.transitions.create(['opacity', 'transform'], { duration })
    },
    '&.animation-grow-enter-done, &.animation-grow-appear-done': {
      ...(isFade && { opacity: 1 }),
      transform: 'scale(1)',
    },
    '&.animation-grow-exit': {
      ...(isFade && { opacity: 1 }),
      transform: 'scale(1)'
    },
    '&.animation-grow-exit-active': {
      ...(isFade && { opacity: 0 }),
      transform: 'scale(0.8)',
      transition: theme.transitions.create(['opacity', 'transform'], { duration })
    },
    '&.animation-grow-exit-done': {
      ...(isFade && { opacity: 0 }),
      transform: 'scale(0)',
    },
  }));


interface ZoomContentProps extends BoxProps {
  duration?: number;
  isFade?: boolean;
}
const ZoomContent = styled(
  forwardRef<HTMLDivElement, BoxProps>(({ className, sx, ...props }, ref) => (
    <Box ref={ref} className={cn(className, 'animation-zoom')} {...props} />
  )),
  {
    shouldForwardProp: (prop) => !['duration', 'isFade'].includes(prop as string)
  })<ZoomContentProps>(({ theme, isFade, duration = 300 }) => ({
    ...baseProps,

    '&.animation-zoom-enter, &.animation-zoom-appear': {
      ...(isFade && { opacity: 0 }),
      transform: 'scale(0.5)'
    },
    '&.animation-zoom-enter-active, &.animation-zoom-appear-active': {
      ...(isFade && { opacity: 1 }),
      transform: 'scale(1)',
      transition: `${theme.transitions.create(['opacity', 'transform'], { duration })}`
    },
    '&.animation-zoom-enter-done, &.animation-zoom-appear-done': {
      ...(isFade && { opacity: 1 }),
      transform: 'scale(1)',
      transition: `${theme.transitions.create(['opacity', 'transform'], { duration })}`
    },

    '&.animation-zoom-exit': {
      ...(isFade && { opacity: 1 }),
      transform: 'scale(1)'
    },

    '&.animation-zoom-exit-active': {
      ...(isFade && { opacity: 0 }),
      transform: 'scale(0.5)',
      transition: theme.transitions.create(['opacity', 'transform'], { duration })
    },
    '&.animation-zoom-exit-done': {
      ...(isFade && { opacity: 0 }),
      transform: 'scale(0)',
      transition: theme.transitions.create(['opacity', 'transform'], { duration })
    },
  }));


interface ZoomSizeProps extends BoxProps {
  duration?: number;
  initialWidth?: number;
  initialHeight?: number;
}

const ZoomSize = styled(
  forwardRef<HTMLDivElement, ZoomSizeProps>(({ className, initialWidth, initialHeight, sx, ...props }, ref) => (
    <Box ref={ref} className={cn(className, 'animation-zoom-size',)} {...props} />
  )),
  {
    shouldForwardProp: (prop) => !['duration', 'initialWidth', 'initialHeight', 'isFade'].includes(prop as string)
  }
)<ZoomSizeProps>(({ theme, duration = 300, initialWidth, initialHeight }) => ({
  // Убираем position: fixed, чтобы элемент был в потоке
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&.animation-zoom-size-enter, &.animation-zoom-size-appear': {
    opacity: 0,
    transform: 'scale(0.5)',
    width: initialWidth ? 0 : 'auto', // анимируем ширину только если задана начальная
    height: initialHeight ? 0 : 'auto',
  },
  '&.animation-zoom-size-enter-active, &.animation-zoom-size-appear-active': {
    opacity: 1,
    transform: 'scale(1)',
    width: initialWidth ? `${initialWidth}px` : 'auto',
    height: initialHeight ? `${initialHeight}px` : 'auto',
    transition: theme.transitions.create(['opacity', 'transform', 'width', 'height'], {
      duration,
      easing: theme.transitions.easing.easeOut
    }),
  },
  '&.animation-zoom-size-enter-done, &.animation-zoom-size-appear-done': {
    opacity: 1,
    transform: 'scale(1)',
    width: initialWidth ? `${initialWidth}px` : 'auto',
    height: initialHeight ? `${initialHeight}px` : 'auto',
  },
  '&.animation-zoom-size-exit': {
    opacity: 1,
    transform: 'scale(1)',
    width: initialWidth ? `${initialWidth}px` : 'auto',
    height: initialHeight ? `${initialHeight}px` : 'auto',
  },
  '&.animation-zoom-size-exit-active': {
    opacity: 0,
    transform: 'scale(0.5)',
    width: initialWidth ? 0 : 'auto',
    height: initialHeight ? 0 : 'auto',
    transition: theme.transitions.create(['opacity', 'transform', 'width', 'height'], {
      duration,
      easing: theme.transitions.easing.easeIn
    }),
  },
  '&.animation-zoom-size-exit-done': {
    opacity: 0, transform: 'scale(0)',
  },
}));

interface SlideContentProps extends BoxProps {
  duration?: number;
  isFade?: boolean;
}
const SlideLeftContent = styled(
  forwardRef<HTMLDivElement, SlideContentProps>(({ className, sx, ...props }, ref) => (
    <Box ref={ref} className={cn(className, 'animation-slide-left')} {...props} />
  )),
  {
    shouldForwardProp: (prop) => !['duration', 'isFade'].includes(prop as string)
  })<SlideContentProps>(({ theme, duration = 300, isFade }) => ({
    ...baseProps,
    '&.animation-slide-left-enter, &.animation-slide-left-appear': {
      ...(isFade && { opacity: 0 }),
      transform: 'translateX(-100%)'
    },
    '&.animation-slide-left-enter-active, &.animation-slide-left-appear-active': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateX(0)',
      transition: theme.transitions.create(['opacity', 'transform'], { duration })
    },
    '&.animation-slide-left-enter-done, &.animation-slide-left-appear-done': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateX(0)'
    },
    '&.animation-slide-left-exit': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateX(0)'
    },
    '&.animation-slide-left-exit-active, &.animation-slide-left-exit-done': {
      ...(isFade && { opacity: 0 }),
      transform: 'translateX(-100%)',
      transition: theme.transitions.create(['opacity', 'transform'], { duration })
    },

  }));


const SlideRightContent = styled(
  forwardRef<HTMLDivElement, BoxProps>(({ className, sx, ...props }, ref) => (
    <Box ref={ref} className={cn(className, 'animation-slide-right')} {...props} />
  )),
  {
    shouldForwardProp: (prop) => !['duration', 'isFade'].includes(prop as string)
  })<SlideContentProps>(({ theme, duration = 300, isFade }) => ({
    ...baseProps,
    '&.animation-slide-right-enter, &.animation-slide-right-appear': {
      ...(isFade && { opacity: 0 }),
      transform: 'translateX(100%)'
    },
    '&.animation-slide-right-enter-active, &.animation-slide-right-appear-active': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateX(0)',
      // Кастомные transition
      transition: isFade
        ? `transform ${duration}ms ease-in-out, opacity ${duration * 0.8}ms ease-in-out`
        : `transform ${duration}ms ease-in-out`
    },
    '&.animation-slide-right-enter-done, &.animation-slide-right-appear-done': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateX(0)'
    },
    '&.animation-slide-right-exit': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateX(0)'
    },
    '&.animation-slide-right-exit-active, &.animation-slide-right-exit-done': {
      ...(isFade && { opacity: 0 }),
      transform: 'translateX(100%)',
      transition: isFade
        ? `transform ${duration}ms ease-in-out, opacity ${duration * 0.8}ms ease-in-out ${duration * 0.5}ms`
        : `transform ${duration}ms ease-in-out`
    },
  }));


const SlideTopContent = styled(
  forwardRef<HTMLDivElement, BoxProps>(({ className, sx, ...props }, ref) => (
    <Box ref={ref} className={cn(className, 'animation-slide-top')} {...props} />
  )),
  {
    shouldForwardProp: (prop) => !['duration', 'isFade'].includes(prop as string)
  })<SlideContentProps>(({ theme, duration = 300, isFade }) => ({
    ...baseProps,
    '&.animation-slide-top-enter, &.animation-slide-top-appear': {
      ...(isFade && { opacity: 0 }),
      transform: 'translateY(-100%)'
    },
    '&.animation-slide-top-enter-active, &.animation-slide-top-appear-active': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateY(0)',
      transition: theme.transitions.create(['opacity', 'transform'], { duration })
    },
    '&.animation-slide-top-enter-done, &.animation-slide-top-appear-done': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateY(0)'
    },
    '&.animation-slide-top-exit': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateY(0)'
    },
    '&.animation-slide-top-exit-active, &.animation-slide-top-exit-done': {
      ...(isFade && { opacity: 0 }),
      transform: 'translateY(-100%)',
      transition: theme.transitions.create(['opacity', 'transform'], { duration })
    },
  }));




const SlideBottomContent = styled(
  forwardRef<HTMLDivElement, BoxProps>(({ className, sx, ...props }, ref) => (
    <Box ref={ref} className={cn(className, 'animation-slide-bottom')} {...props} />
  )),
  {
    shouldForwardProp: (prop) => !['duration', 'isFade'].includes(prop as string)
  })<SlideContentProps>(({ theme, duration = 300, isFade }) => ({
    ...baseProps,
    '&.animation-slide-bottom-enter, &.animation-slide-bottom-appear': {
      ...(isFade && { opacity: 0 }),
      transform: 'translateY(100%)'
    },
    '&.animation-slide-bottom-enter-active, &.animation-slide-bottom-appear-active': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateY(0)',
      transition: theme.transitions.create(['opacity', 'transform'], { duration, })
    },
    '&.animation-slide-bottom-enter-done, &.animation-slide-bottom-appear-done': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateY(0)'
    },
    '&.animation-slide-bottom-exit': {
      ...(isFade && { opacity: 1 }),
      transform: 'translateY(0)'
    },
    '&.animation-slide-bottom-exit-active, &.animation-slide-bottom-exit-done': {
      ...(isFade && { opacity: 0 }),
      transform: 'translateY(100%)',
      transition: theme.transitions.create(['opacity', 'transform'], { duration, })
    },
  }));


const animationComponents = {
  'fade': FadeContent,
  'grow': GrowContent,
  'zoom': ZoomContent,
  'zoom-size': ZoomSize,
  'slide-left': SlideLeftContent,
  'slide-right': SlideRightContent,
  'slide-top': SlideTopContent,
  'slide-bottom': SlideBottomContent,
};

type AnimationType = keyof typeof animationComponents;
export type TransitionAnimationsOneProps = CSSTransitionProps<HTMLDivElement> & {
  animation?: AnimationType;
  children?: ReactNode;
  sx?: SxProps<Theme>;
  timeout?: number;
  isFade?: boolean;
  className?: string
}



export const TransitionAnimationsOne: FC<TransitionAnimationsOneProps> = ({
  children,
  animation = 'slide-left',
  timeout = 300,
  isFade = true,
  sx,
  className,
  ...props
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const classNames = `animation-${animation}`;
  const [initClassName, setInitClassName] = useState('');
  const AnimatedComponent = animationComponents[animation];
  const inRef = useRef(props.in);


  useEffect(() => {
    if (inRef.current) {
      setInitClassName(`${classNames}-enter-done`)
    } else {
      setInitClassName(`${classNames}-exit-done`)
    }
  }, [])

  const getCallDataTransition = useCallback((status: TransitionStatus) => {
    const result = {
      entering: `${classNames}-enter`,
      entered: `${classNames}-enter-done`,
      exiting: `${classNames}-exit`,
      exited: `${classNames}-exit-done`,
    }
    return result[status] || ""
  }, [classNames]);
  // Измеряем размеры только один раз при монтировании
  useEffect(() => {
    if (animation === 'zoom-size' && nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height
      });
    }
  }, [animation]);



  const propsZoomSize = animation === 'zoom-size' ? {
    initialWidth: dimensions.width,
    initialHeight: dimensions.height
  } : {};


  return (
    <CSSTransition
      timeout={timeout}
      nodeRef={nodeRef}
      classNames={classNames}
      {...props}
    >
      {
        (status, props) => {
          const classNameTransition = getCallDataTransition(status);
          return (
            <AnimatedComponent
              ref={nodeRef}
              duration={timeout}
              isFade={isFade}
              sx={sx}
              // {...propsZoomSize}
              className={cn(className, 'asdasdsad')}
            >
              {children}
            </AnimatedComponent>
          )
        }
      }

    </CSSTransition>
  );
};

/*##########-------------<{ Switch }>-------------##########*/


interface SwitchAnimationsProps extends Pick<TransitionAnimationsOneProps, 'sx' | 'animation' | 'timeout'> {
  children: ReactNode;
  key: React.Key
}

export const SwitchAnimationsTransition: FC<SwitchAnimationsProps> = ({
  children,
  timeout = 300,
  ...props
}) => {
  return (
    <SwitchTransition mode="out-in">
      <TransitionAnimationsOne timeout={timeout} unmountOnExit {...props}>
        {children}
      </TransitionAnimationsOne>
    </SwitchTransition>
  );
};




