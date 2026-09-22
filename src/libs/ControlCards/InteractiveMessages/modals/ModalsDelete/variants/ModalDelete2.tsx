import type { InteractiveModalDeleteProps } from '@libs/ControlCards/InteractiveMessages/types';
import React, { FC, ReactNode, useCallback } from "react"

export interface ModalDelete2Props extends InteractiveModalDeleteProps{
  children?: ReactNode;
}

const ModalDelete2Memo:FC<ModalDelete2Props> = ({modal, control}) => {
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
      
    </>
  )
};

export const ModalDelete2 = React.memo(ModalDelete2Memo);
