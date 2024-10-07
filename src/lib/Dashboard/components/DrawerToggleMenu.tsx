import { styled } from '@mui/material';



export const DrawerToggleMenu = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  position: 'absolute',
  pointerEvents: 'none',
  width: 65,
  top: 0,
  bottom: 0,
  left: 0,
  ...theme.mixins.toolbar,
  transform: `scale()`,
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));