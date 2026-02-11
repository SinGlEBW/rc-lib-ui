import React, { FC } from "react"
import { DialogContent, Divider } from "@mui/material"
import { DialogActions, StuledDialogTitle } from '../../../InteractiveMessage.styled'
import { GetExtendsTypeModal, InteractiveMessageItemDefault } from '../../../types'
import { StyledButtonDefault } from '@libs/common/StyledButtonDefault'


// import type { GetExtendsTypeModal, InteractiveMessageItemDefault } from '@features/InteractiveMessages/types';
// import { StyledButtonDefault } from '@components/Buttons/Buttons.styled';

DialogActions
export interface ModalDefault1Props {
  modal: GetExtendsTypeModal<InteractiveMessageItemDefault>
  hideMessage: (id: string) => void
}

const ModalDefault1Memo: FC<ModalDefault1Props> = ({ modal, hideMessage }) => {

  return (
    <>
      <StuledDialogTitle color={modal.severity || ''}>
        {modal.title || ''}
      </StuledDialogTitle>
      <Divider />
      <DialogContent sx={{ paddingX: 1 }}>
        {modal.message}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-around' }}>
        {
          modal.actions.map(({ text, onClick, ...props }) => (
            <StyledButtonDefault
              children={text}
              onClick={(e) => {
                onClick && onClick(e);
                hideMessage(modal.id);
              }}
              {...props}
            />
          ))
        }
      </DialogActions>
    </>
  )
};

export const ModalDefault1 = React.memo(ModalDefault1Memo);
