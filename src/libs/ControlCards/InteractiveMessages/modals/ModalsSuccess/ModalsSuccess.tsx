import React, { FC } from 'react';

import { ModalsSuccessVariant1, type ModalsSuccessVariant1Props } from './variants/ModalsSuccessVariant1';
import { ModalsSuccessVariant2, type ModalsSuccessVariant2Props } from './variants/ModalsSuccessVariant2';
import { ModalsSuccessVariant3, type ModalsSuccessVariant3Props } from './variants/ModalsSuccessVariant3';
import { ModalsSuccessVariant4, type ModalsSuccessVariant4Props } from './variants/ModalsSuccessVariant4';
import { ModalsSuccessVariant5, type ModalsSuccessVariant5Props } from './variants/ModalsSuccessVariant5';


export type ModalsSuccessProps =
  | ModalsSuccessVariant1Props
  | ModalsSuccessVariant2Props
  | ModalsSuccessVariant3Props
  | ModalsSuccessVariant4Props
  | ModalsSuccessVariant5Props


const ModalsSuccessMemo: FC<ModalsSuccessProps> = (props) => {


  /*#############-----------<{ Handlers }>-----------#############*/

  /*#############-----------<{ Helpers }>-----------#############*/
  switch (props.modal.visual) {
    case 'variant2': return <ModalsSuccessVariant2 {...props} />
    case 'variant3': return <ModalsSuccessVariant3 {...props} />
    case 'variant4': return <ModalsSuccessVariant4 {...props} />
    case 'variant5': return <ModalsSuccessVariant5 {...props} />
    default: return <ModalsSuccessVariant1 {...props} />;
  }
};

export const ModalsSuccess = React.memo(ModalsSuccessMemo);

