import { InfoOutlined } from '@mui/icons-material';
import { alpha, DialogContent, Divider } from "@mui/material";
import React, { FC } from "react";

import { DialogActions, StuledDialogTitle } from '@libs/ControlCards/InteractiveMessages/InteractiveMessage.styled';
import { StyledButtonDefault } from '@libs/common/StyledButtonDefault';
import { GetExtendsTypeModal, InteractiveMessageItemInfo } from '../../../types';


export interface ModalInfo1Props {
  modal: GetExtendsTypeModal<InteractiveMessageItemInfo>
}

const ModalInfo1Memo: FC<ModalInfo1Props> = ({ modal }) => {

  return (
    <>
      <StuledDialogTitle color={modal.severity || 'info'} >
        <InfoOutlined color={modal.severity} sx={{ marginRight: 1 }} />
        {modal.title || `Информация ${modal.severity}`}
      </StuledDialogTitle>
      <Divider sx={(theme) => ({ borderColor: alpha(theme.palette[modal.severity! || 'info'].main, .6) })} />
      <DialogContent sx={{ paddingX: 1 }}>
        {modal.message}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'end', pt: 1 }}>
        <StyledButtonDefault
          sx={{ width: '45%' }}
          color={modal.severity! || 'info'}
          onClick={modal?.onConfirm}
          children={modal.confirmText || `Закрыть`}
        />
      </DialogActions>
    </>
  )
};

export const ModalInfo1 = React.memo(ModalInfo1Memo);
