import { Delete } from '@mui/icons-material';
import { Box, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { FC } from "react";

import { DialogActions } from '@libs/ControlCards/InteractiveMessages/InteractiveMessage.styled';
import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { GetExtendsTypeModal, InteractiveMessageItemDelete } from '../../../types';

export interface ModalDelete1Props {
  modal: GetExtendsTypeModal<InteractiveMessageItemDelete>
}

const ModalDelete1Memo: FC<ModalDelete1Props> = ({ modal }) => {
  const isFullModal = modal.view == 'fullModal'

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
        <StyledButtonDefault onClick={modal.onCancel} variant="outlined">
          Отмена
        </StyledButtonDefault>
        <StyledButtonDefault
          onClick={modal.onConfirm}
          variant="contained"
          color="error"
          startIcon={<Delete />}
        >
          Удалить
        </StyledButtonDefault>
      </DialogActions>
    </>
  )
};

export const ModalDelete1 = React.memo(ModalDelete1Memo);
