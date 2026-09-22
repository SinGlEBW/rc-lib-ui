import React, { FC } from 'react';
import { ModalDefault1, type ModalDefault1Props } from './variants/ModalDefault1';

export type ModalsInfoProps = 
| ModalDefault1Props;


const ModalsDefaultMemo: FC<ModalsInfoProps> = (props) => {

  /*#############-----------<{ Handlers }>-----------#############*/

  /*#############-----------<{ Helpers }>-----------#############*/
  switch (props.modal.visual) {
    case 'variant1': return <ModalDefault1 {...props} />
    // case 'variant2': return <ModalDelete2 {...modal} />
    default: return <ModalDefault1 {...props} />;
  }
};

export const ModalsDefault = React.memo(ModalsDefaultMemo);

