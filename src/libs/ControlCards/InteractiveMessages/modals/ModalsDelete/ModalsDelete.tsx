import React, { FC } from 'react';

import { ModalDelete1, type ModalDelete1Props } from './variants/ModalDelete1';


type ModalsDeleteProps = 
|  ModalDelete1Props;
// |  ModalDelete2Props;


const ModalsDeleteMemo: FC<ModalsDeleteProps> = ({ modal }) => {


  /*#############-----------<{ Handlers }>-----------#############*/


  /*#############-----------<{ Helpers }>-----------#############*/
  switch (modal.visual) {
    case 'variant1': return <ModalDelete1 modal={modal} />
    // case 'variant2': return <ModalDelete2 {...modal} />
    default: return <ModalDelete1 modal={modal} />;
  }
};

export const ModalsDelete = React.memo(ModalsDeleteMemo);

