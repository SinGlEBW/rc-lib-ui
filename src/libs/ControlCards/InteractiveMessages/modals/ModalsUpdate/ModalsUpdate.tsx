import React, { FC,  } from 'react';
import { ModalUpdate1, type ModalUpdate1Props } from './variants/ModalUpdate1';


type ModalsUpdateProps = 
|  ModalUpdate1Props;


const ModalsUpdateMemo: FC<ModalsUpdateProps> = (props) => {

  /*#############-----------<{ Handlers }>-----------#############*/

  /*#############-----------<{ Helpers }>-----------#############*/
  switch (props.modal.visual) {
    case 'variant1': return <ModalUpdate1 {...props} />
    // case 'variant2': return <ModalDelete2 {...modal} />
    default: return <ModalUpdate1 {...props} />;
  }
};

export const ModalsUpdate = React.memo(ModalsUpdateMemo);

