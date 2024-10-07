import { styled } from '@mui/material'

export interface ListButtonInnerProps {}

export const ListButtonInner = styled('div', {
  target: 'MuiButtonInner',
  shouldForwardProp: (propName) => ![''].includes(propName as string),
})<ListButtonInnerProps>(({theme}) => ({
  width: `calc(100% - ${theme.spacing(2)})`,
  marginLeft: theme.spacing(2),
  position: 'relative'
}))
