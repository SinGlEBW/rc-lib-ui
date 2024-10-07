import { Box, styled } from '@mui/material'

export interface MuiFooterProps { }

export const MuiFooter = styled(Box, {
  target: 'MuiFooter-root',
  shouldForwardProp: (propName) => ![''].includes(propName as string),
})<MuiFooterProps>(({  }) => ({
  // position: 'absolute',
  // left: 0,
  // bottom: 0,
  // right: 0,
  minHeight: 48,
  
}))
