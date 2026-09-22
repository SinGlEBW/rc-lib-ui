import React, { FC, useCallback } from "react"
import { CheckCircle, VerifiedUser } from '@mui/icons-material';
import { Box, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';

import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { InteractiveModalSuccessProps  } from '../../../types';


export interface ModalsSuccessVariant1Props extends InteractiveModalSuccessProps{}

const ModalsSuccessVariant1Memo: FC<ModalsSuccessVariant1Props> = ({ modal, control }) => {
  
  const handleOnCansel = useCallback(() => {
    modal.onCancel && modal.onCancel();
    control.hideMessage(modal.id);
  }, []);

  return (
    <>
      <DialogTitle sx={{ p: 2.5, fontWeight: 600 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <VerifiedUser color="success" />
          <span>{modal.title}</span>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {
          typeof modal.message === 'string'
            ? (<Typography variant="h6" gutterBottom>{modal.message}</Typography>)
            : (modal.message)
        }
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <StyledButtonDefault
          sx={{ minWidth: '45%' }}
          onClick={handleOnCansel}
          variant="contained"
          color="success"
          size="large"
          startIcon={<CheckCircle />}
        >
          {modal.buttonText || 'OK'}
        </StyledButtonDefault>
      </DialogActions>
    </>
  )
};

export const ModalsSuccessVariant1 = React.memo(ModalsSuccessVariant1Memo);
