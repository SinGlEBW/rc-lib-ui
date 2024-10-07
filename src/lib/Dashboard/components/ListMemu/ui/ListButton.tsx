import { type ListItemButtonProps } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ListButtonStyled, defaultState } from './ListButtonStyled';


export interface ListButtonProps extends ListItemButtonProps {
  isOpen: boolean;
  isWrapText: boolean;
}

export const ListButton = <C extends React.ElementType>({ sx = {}, isWrapText, isOpen, ...props }: ListItemButtonProps<C, { component?: C; }> & ListButtonProps) => {
  const buttonRef = useRef<HTMLElement>(null);
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    if (isWrapText && buttonRef?.current) {
      const { scrollHeight, clientHeight } = buttonRef?.current;
      if (isOpen) {
        (!state.height) && setState((prev) => ({ ...prev, height: clientHeight }));
        (scrollHeight !== clientHeight) && setState({ ...defaultState, height: scrollHeight + clientHeight });
      } else {
        setState({ ...defaultState, height: defaultState.minHeight });
      }
    }
  }, [isOpen]);
  
  // const isHeight = !!state.height;
  //sx может быть функцией поэтому её надо переедать и работать со
 
  return (
    <ListButtonStyled
      minHeight={state.minHeight}
      ref={buttonRef}
      sx={sx}
      {...props} />
  );
};
