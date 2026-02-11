import React, { FC } from "react"
import { Box, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { GetExtendsTypeModal, InteractiveMessageItemSuccess  } from '../../../types';

export interface ModalsSuccessVariant2Props {
  modal: GetExtendsTypeModal<InteractiveMessageItemSuccess>
}

const ModalsSuccessVariant2Memo: FC<ModalsSuccessVariant2Props> = ({ modal }) => {
  return (
    <>
      <DialogTitle>{modal.title}</DialogTitle>
      <DialogContent>
        <Typography>{modal.message}</Typography>
      </DialogContent>
      <DialogActions>
        <StyledButtonDefault
          onClick={modal.onCancel}
          variant="contained" color="success">
          {modal.buttonText || 'OK'}
        </StyledButtonDefault>
      </DialogActions>
    </>
  )
};

export const ModalsSuccessVariant2 = React.memo(ModalsSuccessVariant2Memo);
