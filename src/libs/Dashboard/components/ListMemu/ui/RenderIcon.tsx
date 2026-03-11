import type { SxProps, Theme } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import type { FC } from 'react';

export interface RenderIconProps{
  icon?: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
  sx?: SxProps<Theme>;

}



export const RenderIcon:FC<RenderIconProps> = ({ icon, sx }) => (
  <ListItemIcon 
  sx={{   
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center', 
    ...sx 
  }} children={icon} />
)
