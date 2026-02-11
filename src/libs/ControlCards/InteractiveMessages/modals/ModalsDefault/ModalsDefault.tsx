import React, { FC } from 'react';
import { ModalDefault1, type ModalDefault1Props } from './variants/ModalDefault1';


export type ModalsInfoProps =
  | ModalDefault1Props;


const ModalsDefaultMemo: FC<ModalsInfoProps> = ({ modal, hideMessage }) => {

  /*#############-----------<{ Handlers }>-----------#############*/

  /*#############-----------<{ Helpers }>-----------#############*/
  switch (modal.visual) {
    case 'variant1': return <ModalDefault1 modal={modal} hideMessage={hideMessage} />
    // case 'variant2': return <ModalDelete2 {...modal} />
    default: return <ModalDefault1 modal={modal} hideMessage={hideMessage} />;
  }
};

export const ModalsDefault = React.memo(ModalsDefaultMemo);

