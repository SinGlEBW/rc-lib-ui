import { DialogActions, DialogContent, Divider, Typography } from '@mui/material';
import React, { FC } from "react";

import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { StuledDialogTitle } from '@libs/ControlCards/InteractiveMessages/InteractiveMessage.styled';
import { GetExtendsTypeModal, InteractiveMessageItemSuccess } from '../../../types';


export interface ModalsSuccessVariant3Props {
    modal: GetExtendsTypeModal<InteractiveMessageItemSuccess>
 }

const ModalsSuccessVariant3Memo: FC<ModalsSuccessVariant3Props> = ({ modal }) => {
  return (
    <>
      <StuledDialogTitle color={modal.severity || ''}>
        {modal.title || 'Успех'}
      </StuledDialogTitle>
      <Divider />
      <DialogContent sx={{ paddingX: 1 }}>
        {
          typeof modal.message === 'string'
            ? (<Typography variant="h6" gutterBottom>{modal.message}</Typography>)
            : (modal.message)
        }
      </DialogContent>
      <DialogActions sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StyledButtonDefault color={modal.severity || "success"}
          onClick={modal.onCancel}>
          {modal.buttonText || 'OK'}
        </StyledButtonDefault>
      </DialogActions>
    </>
  );

};

export const ModalsSuccessVariant3 = React.memo(ModalsSuccessVariant3Memo);
