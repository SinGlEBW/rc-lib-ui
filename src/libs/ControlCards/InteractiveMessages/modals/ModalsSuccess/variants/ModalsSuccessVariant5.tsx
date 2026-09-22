import React, { FC, useCallback } from "react"
import { Box, DialogContent, Typography, styled } from '@mui/material';
import { TaskAlt } from '@mui/icons-material';

import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { InteractiveModalSuccessProps } from '../../../types';


const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
  color: 'white',
  padding: theme.spacing(3),
  textAlign: 'center'
}));

export interface ModalsSuccessVariant5Props extends InteractiveModalSuccessProps{}

const ModalsSuccessVariant5Memo: FC<ModalsSuccessVariant5Props> = ({ modal, control }) => {

  const handleOnCansel = useCallback(() => {
    modal.onCancel && modal.onCancel();
    control.hideMessage(modal.id);
  }, []);

  return (
    <>
      <GradientBox>
        <TaskAlt sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          {modal.title}
        </Typography>
        <Typography variant="body1">{modal.message}</Typography>
      </GradientBox>
      <DialogContent sx={{ textAlign: 'center', py: 3 }}>
        <StyledButtonDefault
          onClick={handleOnCansel}
          variant="contained"
          color="success"
          size="large"
          sx={{ minWidth: '45%' }}
        >
          {modal.buttonText || 'OK'}
        </StyledButtonDefault>
      </DialogContent>
    </>
  );
};

export const ModalsSuccessVariant5 = React.memo(ModalsSuccessVariant5Memo);
