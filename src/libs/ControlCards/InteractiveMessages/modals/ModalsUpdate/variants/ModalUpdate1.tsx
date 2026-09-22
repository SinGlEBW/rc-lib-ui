import React, { FC, useCallback } from "react";
import { Box, DialogContent } from "@mui/material";

import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { DialogActions, StuledDialogTitle } from '@libs/ControlCards/InteractiveMessages/InteractiveMessage.styled';
import { InteractiveModalUpdateProps } from '../../../types';

export interface ModalUpdate1Props extends InteractiveModalUpdateProps { }

const ModalUpdate1Memo: FC<ModalUpdate1Props> = ({ modal, control }) => {

  const handleOnCansel = useCallback(() => {
    modal.onCancel && modal.onCancel();
    control.hideMessage(modal.id);
  }, []);

  const handleOnConfirm = useCallback(() => {
    modal.onConfirm && modal.onConfirm();
    control.hideMessage(modal.id);
  }, []);

  return (
    <>
      <StuledDialogTitle>Обновление</StuledDialogTitle>
      <DialogContent><Box py={2}>{modal.message}</Box></DialogContent>
      <DialogActions>
        {modal.onCancel && ( <StyledButtonDefault onClick={handleOnCansel} children={'Отмена'} /> )}
        {modal.onConfirm && ( <StyledButtonDefault color="primary" onClick={handleOnConfirm} children={'Обновить'} /> )}
      </DialogActions>
    </>
  )
};

export const ModalUpdate1 = React.memo(ModalUpdate1Memo);
