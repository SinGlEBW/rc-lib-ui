import React from 'react';
import { styled } from '@mui/material';

export interface ContentBoxProps {

}
export const ContentBox = styled('main')<ContentBoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

