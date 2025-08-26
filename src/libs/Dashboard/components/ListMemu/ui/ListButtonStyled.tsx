import { ListItemButton, styled } from '@mui/material';




export interface ListButtonStyledProps{
  minHeight: number;
}


export const ListButtonStyled = styled(ListItemButton, {
  shouldForwardProp: (propName) => !['minHeight'].includes(propName as string),
})<ListButtonStyledProps>(({minHeight}) => ({
  minHeight,
  padding: '8px',
  paddingLeft: 0,
  transition: 'height .1s ease-in-out',
  overflow: 'hidden'
}))


export const defaultState = { minHeight: 48, height: 0 };


