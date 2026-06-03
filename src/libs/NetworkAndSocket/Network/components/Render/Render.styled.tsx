import { styled, BoxProps, Box } from '@mui/material';
import cn from 'classnames';


const BaseNetworRoot = styled(({className, ...props}: BoxProps) => <Box className={cn('BaseNetworRoot', 'bg-gradient', className)} {...props} />)(
  ({theme}) => ({
    color: theme.palette.common.white    
  })
)


export const StyledNetworkOffline = styled(({className, ...props}: BoxProps) => <BaseNetworRoot className={cn('StyledNetworkOffline', className)} {...props} />)(
  ({theme}) => ({
    backgroundColor: theme.palette.error.light
  })
)
export const StyledNetworkOnline = styled(({className, ...props}: BoxProps) => <BaseNetworRoot className={cn('StyledNetworkOnline', className)} {...props} />)(
  ({theme}) => ({
    backgroundColor: theme.palette.success.light
  })
)
