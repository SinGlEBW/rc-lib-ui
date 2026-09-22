import React, { FC } from "react"
import { DialogContent, Divider } from "@mui/material"
import { DialogActions, StuledDialogTitle } from '../../../InteractiveMessage.styled'
import { InteractiveModalDefaultProps } from '../../../types'
import { StyledButtonDefault } from '@libs/common/StyledButtonDefault'





export interface ModalDefault1Props extends InteractiveModalDefaultProps{}

const ModalDefault1Memo: FC<ModalDefault1Props> = ({ modal, control }) => {

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
          modal?.actions?.map(({ text, onClick, ...props }, inx) => (
            <StyledButtonDefault
              key={inx}
              children={text}
              onClick={(e) => {
                control.hideMessage(modal.key || modal.id);
                onClick && onClick(e);
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
