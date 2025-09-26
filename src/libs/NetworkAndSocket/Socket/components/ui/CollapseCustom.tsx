import React from 'react';
import { Collapse, type CollapseProps, styled, type SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';

const Message = styled('span')({
  backgroundColor: 'rgba(0,0,0,0.3)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  padding: '1px 10px',
  borderRadius: '3px 3px 3px 3px'
})



export const SocketCollapse = styled(
  ({ children, ...props }: CollapseProps) => (
    <Collapse {...props} unmountOnExit>
      <Message>{children}</Message>
    </Collapse>
  )
)(({ theme }) => ({
  fontSize: 10,
  position: 'absolute',
  left: 0,
  right: 0,


  display: 'flex',
  alignItems: 'center',
  '& .MuiCollapse-wrapperInner': {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1,
    justifyContent: 'center',
    fontWeight: 700,
    color: '#151616',
    letterSpacing: 1,
  },
}))
