import React, { FC } from 'react';
import { ModalInfo1, type ModalInfo1Props } from './variants/ModalInfo1';


export type ModalsInfoProps = 
|  ModalInfo1Props;


const ModalsInfoMemo: FC<ModalsInfoProps> = (props) => {

  switch (props.modal.visual) {
    case 'variant1': return <ModalInfo1 {...props} />
    // case 'variant2': return <ModalDelete2 {...modal} />
    default: return <ModalInfo1 {...props} />;
  }
};

export const ModalsInfo = React.memo(ModalsInfoMemo);

