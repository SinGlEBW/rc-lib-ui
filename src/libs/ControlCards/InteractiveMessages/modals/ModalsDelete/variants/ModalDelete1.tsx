import { Delete } from '@mui/icons-material';
import { Box, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { FC, useCallback } from "react";

import { DialogActions } from '@libs/ControlCards/InteractiveMessages/InteractiveMessage.styled';
import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { InteractiveModalDeleteProps } from '../../../types';

export interface ModalDelete1Props extends InteractiveModalDeleteProps{}

const ModalDelete1Memo: FC<ModalDelete1Props> = ({ modal, control }) => {
  const isFullModal = modal.view == 'fullModal'
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
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {modal.title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>
          {modal.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <StyledButtonDefault onClick={handleOnCansel} variant="outlined" children={'Отмена'}/>
        <StyledButtonDefault
          onClick={handleOnConfirm}
          variant="contained"
          color="error"
          startIcon={<Delete />}
          children={'Удалить'}
        />
      </DialogActions>
    </>
  )
};

export const ModalDelete1 = React.memo(ModalDelete1Memo);
