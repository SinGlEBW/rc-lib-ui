import React, { FC,  } from 'react';
import { ModalUpdate1, type ModalUpdate1Props } from './variants/ModalUpdate1';


type ModalsUpdateProps = 
|  ModalUpdate1Props;


const ModalsUpdateMemo: FC<ModalsUpdateProps> = ({ modal }) => {

  /*#############-----------<{ Handlers }>-----------#############*/

  /*#############-----------<{ Helpers }>-----------#############*/
  switch (modal.visual) {
    case 'variant1': return <ModalUpdate1 modal={modal} />
    // case 'variant2': return <ModalDelete2 {...modal} />
    default: return <ModalUpdate1 modal={modal} />;
  }
};

export const ModalsUpdate = React.memo(ModalsUpdateMemo);

