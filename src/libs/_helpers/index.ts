import  React, { Dispatch, SetStateAction } from 'react';
import type { Theme } from '@mui/material';


class Colors {

  getColorPalette = (theme: Theme, color: string) => {
    if(color.startsWith('#')){
      return color
    }
    const { palette } = theme;
    const { mode } = palette;
    const dataColor = (palette as any)[color];
    return dataColor ? dataColor[mode] : 'primary'
  }
}

export class Utils {
  static colors = new Colors();
}




export function setStateDecorator<S extends object>(state:S, setState:Dispatch<SetStateAction<S>>){
  return (payload: Partial<typeof state>) => setState((prev) => ({...prev, ...payload}))
}