import React, { FC } from 'react';
import { ModalDefault1, type ModalDefault1Props } from './variants/ModalDefault1';
import type { CustomModalsPayload } from '../../InteractiveMessage.provider';


export type ModalsInfoProps =
  | CustomModalsPayload;


const ModalsDefaultMemo: FC<ModalsInfoProps> = ({ modal, control: { hideMessage } }) => {

  /*#############-----------<{ Handlers }>-----------#############*/

  /*#############-----------<{ Helpers }>-----------#############*/
  switch (modal.visual) {
    case 'variant1': return <ModalDefault1 modal={modal as any} hideMessage={hideMessage} />
    // case 'variant2': return <ModalDelete2 {...modal} />
    default: return <ModalDefault1 modal={modal as any} hideMessage={hideMessage} />;
  }
};

export const ModalsDefault = React.memo(ModalsDefaultMemo);

