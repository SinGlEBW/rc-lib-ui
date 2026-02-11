import { Box, styled } from '@mui/material';

interface StyledCoundChipProps { }

export const StyledCoundChip = styled(Box, {
  shouldForwardProp: (propName) => ![''].includes(propName as string),
})<StyledCoundChipProps>(({ theme }) => ({
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(1.7),
  color: theme.palette.getContrastText(theme.palette.primary.main),
  borderRadius: '50%',
  width: 24,
  height: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))
