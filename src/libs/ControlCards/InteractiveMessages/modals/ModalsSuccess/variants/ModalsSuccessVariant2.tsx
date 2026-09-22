import React, { FC, useCallback } from "react"
import { DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { InteractiveModalSuccessProps } from '../../../types';

export interface ModalsSuccessVariant2Props extends InteractiveModalSuccessProps{}

const ModalsSuccessVariant2Memo: FC<ModalsSuccessVariant2Props> = ({ modal, control }) => {

  const handleOnCansel = useCallback(() => {
    modal.onCancel && modal.onCancel();
    control.hideMessage(modal.id);
  }, []);

  return (
    <>
      <DialogTitle>{modal.title}</DialogTitle>
      <DialogContent>
        <Typography>{modal.message}</Typography>
      </DialogContent>
      <DialogActions>
        <StyledButtonDefault
          onClick={handleOnCansel}
          variant="contained" color="success">
          {modal.buttonText || 'OK'}
        </StyledButtonDefault>
      </DialogActions>
    </>
  )
};

export const ModalsSuccessVariant2 = React.memo(ModalsSuccessVariant2Memo);
