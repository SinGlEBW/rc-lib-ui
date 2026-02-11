import React, { FC } from "react"
import { Box, DialogContent, Typography, styled } from '@mui/material';
import { TaskAlt } from '@mui/icons-material';

import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { GetExtendsTypeModal, InteractiveMessageItemSuccess  } from '../../../types';


const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
  color: 'white',
  padding: theme.spacing(3),
  textAlign: 'center'
}));

export interface ModalsSuccessVariant5Props {
  modal: GetExtendsTypeModal<InteractiveMessageItemSuccess>
}

const ModalsSuccessVariant5Memo: FC<ModalsSuccessVariant5Props> = ({ modal }) => {
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
          onClick={modal.onCancel}
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
