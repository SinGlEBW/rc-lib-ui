import React, { FC } from 'react';
import { ModalInfo1, type ModalInfo1Props } from './variants/ModalInfo1';


export type ModalsInfoProps = 
|  ModalInfo1Props;


const ModalsInfoMemo: FC<ModalsInfoProps> = ({ modal }) => {

  /*#############-----------<{ Handlers }>-----------#############*/

  /*#############-----------<{ Helpers }>-----------#############*/
  switch (modal.visual) {
    case 'variant1': return <ModalInfo1 modal={modal} />
    // case 'variant2': return <ModalDelete2 {...modal} />
    default: return <ModalInfo1 modal={modal} />;
  }
};

export const ModalsInfo = React.memo(ModalsInfoMemo);

