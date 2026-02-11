import React, { FC } from "react"
import { Box, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { GetExtendsTypeModal, InteractiveMessageItemSuccess  } from '../../../types';


export interface ModalsSuccessVariant4Props {
    modal: GetExtendsTypeModal<InteractiveMessageItemSuccess>
 }

const ModalsSuccessVariant4Memo: FC<ModalsSuccessVariant4Props> = ({ modal }) => {
  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <CheckCircle
        sx={{
          fontSize: 64,
          color: 'geen',
          mb: 2
        }}
      />
      <Typography variant="h5" gutterBottom>
        {modal.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {modal.message}
      </Typography>
      <StyledButtonDefault
        fullWidth
        onClick={modal.onCancel}
        variant="contained"
        color="success"
        size="large"
      >
        Ок
      </StyledButtonDefault>
    </Box>
  );
};

export const ModalsSuccessVariant4 = React.memo(ModalsSuccessVariant4Memo);
