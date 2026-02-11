import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material';


export type StyledButtonDefaultProps<T = any> = ButtonProps & T
export const StyledButtonDefault = styled(
  ({ className, ...props }: StyledButtonDefaultProps) =>
    <Button variant='contained' color='primary' className={cn('bg-gradient', className)} {...props} />
)(({ theme }) => ({
  textTransform: 'none',
  padding: '10px 16px'
}));

