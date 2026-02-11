import { Box, DialogContent } from "@mui/material";
import React, { FC } from "react";

import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { DialogActions, StuledDialogTitle } from '@libs/ControlCards/InteractiveMessages/InteractiveMessage.styled';
import { GetExtendsTypeModal, InteractiveMessageItemUpdate } from '../../../types';

export interface ModalUpdate1Props {
  modal: GetExtendsTypeModal<InteractiveMessageItemUpdate>
}

const ModalUpdate1Memo: FC<ModalUpdate1Props> = ({ modal }) => {

  return (
    <>
      <StuledDialogTitle>Обновление</StuledDialogTitle>
      <DialogContent><Box py={2}>{modal.message}</Box></DialogContent>
      <DialogActions>
        {modal.onCancel && (
          <StyledButtonDefault onClick={modal.onCancel} >
            Отмена
          </StyledButtonDefault>
        )}
        {modal.onConfirm && (
          <StyledButtonDefault color="primary" onClick={modal.onConfirm} >
            Обновить
          </StyledButtonDefault>
        )}
      </DialogActions>
    </>
  )
};

export const ModalUpdate1 = React.memo(ModalUpdate1Memo);
