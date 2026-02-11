import { Close } from '@mui/icons-material';
import { Alert, Box, IconButton } from '@mui/material';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { SnackbarContent, CustomContentProps, useSnackbar } from 'notistack';
import { NotificationDeleteSelection } from './NotificationDeleteSelection';


interface CustomSnackbarProps extends CustomContentProps {

}


export type DeleteCountdownAlertProps = {
  onUndo: () => void;
  onExpire?: () => void;
  duration?: number;
}


declare module 'notistack' {
  interface VariantOverrides {
    deleteCountdown: DeleteCountdownAlertProps
  }
}


export const customAlerts = {
  success: forwardRef<HTMLDivElement, CustomSnackbarProps>(({ id, message, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();
    return (
      <Alert
        elevation={2}
        ref={ref}
        severity="success"

        action={
          <IconButton size="small" onClick={() => closeSnackbar(id)}>
            <Close fontSize="small" />
          </IconButton>
        }
        sx={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'success.light',
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {/* <CheckCircle /> */}
          {message}
        </Box>
      </Alert>
    )
  }),
  error: forwardRef<HTMLDivElement, CustomSnackbarProps>(({ id, message, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();
    return (
      <Alert
        elevation={2}
        ref={ref}
        severity="error"
        action={
          <IconButton size="small" onClick={() => closeSnackbar(id)}>
            <Close fontSize="small" />
          </IconButton>
        }
        sx={{ width: '100%', alignItems: 'center', color: 'common.white', backgroundColor: 'error.light' }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {/* <Error /> */}
          {message}
        </Box>
      </Alert>
    )
  }),
  warning: forwardRef<HTMLDivElement, CustomSnackbarProps>(({ id, message, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();
    return (
      <Alert
        elevation={2}
        ref={ref}
        severity="warning"
        action={
          <IconButton size="small" onClick={() => closeSnackbar(id)}>
            <Close fontSize="small" />
          </IconButton>
        }
        sx={{ width: '100%', alignItems: 'center', backgroundColor: 'warning.light' }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {/* <Warning /> */}
          {message}
        </Box>
      </Alert>
    )
  }),
  info: forwardRef<HTMLDivElement, CustomSnackbarProps>(({ id, message, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();
    return (
      <Alert
        elevation={2}
        ref={ref}
        severity="info"
        action={
          <IconButton size="small" onClick={() => closeSnackbar(id)}>
            <Close fontSize="small" />
          </IconButton>
        }
        sx={{ width: '100%', alignItems: 'center', backgroundColor: 'info.light' }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {/* <Info /> */}
          {message}
        </Box>
      </Alert>
    )
  }),
  deleteCountdown: forwardRef<HTMLDivElement, DeleteCountdownAlertProps & CustomContentProps>((props, ref) => {
    const { message, duration = 10000, onUndo, onExpire, id, anchorOrigin, } = props;

    const [time, setTime] = useState(duration / 1000);
    const { closeSnackbar } = useSnackbar();

    const handleOnExpire = useCallback(() => {
      onExpire && onExpire();
      closeSnackbar(id)
    }, [onExpire, closeSnackbar, id]);


    useEffect(() => {
      if (time <= 0) { handleOnExpire(); return };
      const interval = setInterval(() => {
        setTime(prev => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            clearInterval(interval)
          };
          return newValue;
        });
       
      }, 1000);

      return () => clearInterval(interval);
    }, [handleOnExpire, time]);



    
    
    const handleUndo = () => {
      onUndo && onUndo();
      closeSnackbar(id)
    }
    
    
    const progress = (time / Math.ceil(duration / 1000)) * 100;
    const style = {
      ...(anchorOrigin?.horizontal === 'center' && { justifyContent: 'center' }),
      ...props.style || {},
    }
    
    return (
      <SnackbarContent ref={ref} role="alert" style={style} >
        <NotificationDeleteSelection
          time={time}
          progress={progress}
          text={message as string}
          onUndo={handleUndo}
        />
      </SnackbarContent>
    )
  }),
};



