import React from 'react';
import { styled, keyframes, Box, Snackbar, Alert } from '@mui/material';
import type { InteractiveMessageModalsProps } from './types';
import { Card } from '@mui/material';
import cn from 'classnames';
import type { BoxProps } from '@mui/material';
import { DialogTitle } from '@mui/material';
import type { AlertProps } from '@mui/material';

// Анимации
const slideIn = keyframes({
  from: {
    transform: 'translateX(100%)',
    opacity: 0
  },
  to: {
    transform: 'translateX(0)',
    opacity: 1
  }
});

const slideOut = keyframes({
  from: {
    transform: 'translateX(0)',
    opacity: 1
  },
  to: {
    transform: 'translateX(100%)',
    opacity: 0
  }
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'scale(0.8) translateY(-50%)'
  },
  to: {
    opacity: 1,
    transform: 'scale(1) translateY(0)'
  }
});

const fadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'scale(1)'
  },
  to: {
    opacity: 0,
    transform: 'scale(0)'
  }
});

const backdropFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});

const backdropfadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 }
});

interface AlertWrapperProps {
  isExiting: boolean;
}

export const StyledAlertParent = styled(Box, {
  shouldForwardProp: (propName) => ![''].includes(propName as string)
})(({ theme }) => ({
  position: 'absolute',

  display: 'flex',
  padding: theme.spacing(1.5),
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  // height: 'auto',
  pointerEvents: 'none'
}));


export const AlertWrapper = styled(Box, {
  shouldForwardProp: (propName) => !['isExiting'].includes(propName as string)
})<AlertWrapperProps>(({ isExiting }) => ({
  animation: `${isExiting ? slideOut : slideIn} 0.3s ease forwards`,
  pointerEvents: 'all',
  position: 'relative',
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  '& .MuiPaper-root': {
    maxWidth: '100%',
  }
}));


export const StyledAlert = styled(Alert, {
  // shouldForwardProp: (propName) => ![''].includes(propName as string)
})<AlertProps>(({ theme }) => ({
  '& .MuiAlert-message': {
    display: 'flex',
    overflowWrap: 'anywhere',
    hyphens: 'auto'
  }
}));



export const ModalBackdrop = styled(
  ({ className, ...props }: BoxProps) => <Box className={cn('ModalBackdrop', className)} {...props} />,
  {
    shouldForwardProp: (prevProp) => !['isExiting'].includes(prevProp as string)
  }
)<{ isExiting: boolean }>(({ isExiting }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1300,
  animation: `${isExiting ? backdropfadeOut : backdropFadeIn} 0.3s ease forwards`
}));

const getSeverityColor = (severity: string) => {
  const colors = {
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3'
  };
  return colors[severity as keyof typeof colors] || colors.info;
};

interface ModalContentProps extends Pick<InteractiveMessageModalsProps, 'view' | 'severity'> {
  isExiting: boolean;
}

export const ModalContent = styled(
  Card,
  {
    shouldForwardProp: (prevProp) => !['view', 'severity', 'isExiting'].includes(prevProp as string)
  }
)<ModalContentProps>(({ theme, view, isExiting }) => ({
  padding: 0,
  width: view === 'fullModal' ? '100vw' : 'auto',
  height: view === 'fullModal' ? '100vh' : 'auto',
  maxWidth: view === 'fullModal' ? 'none' : '90vw',
  maxHeight: view === 'fullModal' ? 'none' : '90vh',
  overflow: 'auto',
  borderRadius: view === 'fullModal' ? 0 : 5,
  boxShadow: view === 'fullModal' ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.15)',
  animation: `${isExiting ? fadeOut : fadeIn} 0.3s ease forwards`
}));

export const DialogContainer = styled('div')({
  padding: '24px',

});

export const StuledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  padding: 0,
  alignItems: 'center',
  justifyContent: 'center',
  // margin: '0 0 16px 0',
  fontSize: '1.5rem',
  fontWeight: 600,
  color: theme.palette.text.primary
}));

export const DialogMessage = styled('div')(({ theme }) => ({
  marginBottom: '24px',
  fontSize: '1rem',
  lineHeight: 1.5,
  color: theme.palette.text.secondary
}));

export const DialogActions = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '16px',
  padding: '0 20px 20px 20px',
});