import { TransitionDuration } from "notistack";
import React from "react";

function setRef<T>(ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined, value: T | null): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function useForkRef<Instance>(refA: React.Ref<Instance> | null | undefined, refB: React.Ref<Instance> | null | undefined): React.Ref<Instance> | null {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

interface ComponentProps {
  style?: React.CSSProperties | undefined;

  timeout: number | TransitionDuration;
  mode: "enter" | "exit";
}

interface TransitionPropsReturnType {
  duration: number;
  easing: string | undefined;
  delay: string | undefined;
}

export function getTransitionProps(props: ComponentProps): TransitionPropsReturnType {
  const { timeout, style = {}, mode } = props;
  return {
    duration: typeof timeout === "object" ? timeout[mode] || 0 : timeout,
    easing: style.transitionTimingFunction,
    delay: style.transitionDelay,
  };
}

export const reflow = (node: Element): void => {
  // eslint-disable-next-line no-self-assign
  node.scrollTop = node.scrollTop;
};

interface CreateTransitionOptions {
  duration: number;
  easing?: string;
  delay?: string | number;
}

const defaultEasing = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
};

const formatMs = (milliseconds: number) => `${Math.round(milliseconds)}ms`;

export function createTransition(props: string | string[] = ["all"], options?: CreateTransitionOptions): string {
  const { duration = 300, easing = defaultEasing.easeInOut, delay = 0 } = options || {};

  const properties = Array.isArray(props) ? props : [props];

  return properties
    .map((animatedProp) => {
      const formattedDuration = typeof duration === "string" ? duration : formatMs(duration);
      const formattedDelay = typeof delay === "string" ? delay : formatMs(delay);
      return `${animatedProp} ${formattedDuration} ${easing} ${formattedDelay}`;
    })
    .join(",");
}
