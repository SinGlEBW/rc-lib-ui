import { styled } from '@mui/material';


export interface MuiMenuHeaderProps {}

export const MuiMenuHeader = styled('div')<MuiMenuHeaderProps>(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));