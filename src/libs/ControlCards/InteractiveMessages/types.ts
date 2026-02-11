import type { ButtonProps } from '@mui/material';
import type { OptionsObject, SnackbarMessage, VariantType } from 'notistack';
import type { ReactNode } from 'react';
import { DeleteCountdownAlertProps } from './alerts/Alerts.styled';


type ViewMessage =  'modal' | 'fullModal';


export interface InteractiveMessageItemCommon {
  message: string | ReactNode;
  timeout?: number;
  dismissible?: boolean;
}


type DefaultShowAlertsVariant = Exclude<VariantType, 'deleteCountdown'>;
export type InteractiveMessageAlertProps = InteractiveMessageItemCommon 
& Pick<OptionsObject<DefaultShowAlertsVariant>, 'onClose' | 'onEnter' | 'onEntered' | 'anchorOrigin'> & 
{
  animation?: 'Fade' | 'Grow' | 'Zoom' | 'Slide';
  variant?: "filled" | "standard" | "outlined";
  severity?: DefaultShowAlertsVariant
}


interface ViewModal extends InteractiveMessageItemCommon{  
  title?: string;
  view?: 'modal' | 'fullModal'
  severity?: 'success' | 'error' | 'warning' | 'info';
}


export interface InteractiveMessageItemUpdate extends ViewModal {
  mode: 'update';
  onConfirm?(): void;
  onCancel?(): void;
  visual?: 'variant1' 
}



export interface InteractiveMessageItemInfo extends ViewModal {
  mode: 'info';
  confirmText?: string;
  onConfirm?(): void;
  onCancel(): void;
  visual?: 'variant1' 
}

export interface InteractiveMessageItemDelete extends ViewModal {
  // itemsDelete: PayloadDeleteItems['items'];
  mode: 'delete';
  onConfirm(): void;
  onCancel?(): void;
  confirmText?: string;
  cancelText?: string;

  // listSection
  visual?: 'variant1' //можно добавлять
}

export interface InteractiveMessageItemSuccess extends ViewModal {
  mode: 'success';
  onCancel?(): void;
  buttonText?: string;
  visual?: 'variant1' | 'variant2' | 'variant3' | 'variant4' | 'variant5' | 'variant6' 
}

export interface InteractiveMessageItemDefault extends ViewModal {
  mode: 'default';
  actions: (Partial<Pick<ButtonProps, 'sx' | 'onClick'> > & { text: string })[]
  visual?: 'variant1' 
}

export type InteractiveMessageModalsProps = 
  | InteractiveMessageItemUpdate 
  | InteractiveMessageItemInfo 
  | InteractiveMessageItemDelete
  | InteractiveMessageItemSuccess 
  | InteractiveMessageItemDefault; 


export type InteractiveMessageControl = {
  id: string;
  isExiting: boolean;
}
  


export type InteractiveMessageStateProps =  
  & InteractiveMessageControl 
  & Omit<InteractiveMessageAlertProps, 'view'> 
  & Omit<InteractiveMessageModalsProps, 'view'>
  & {view: ViewMessage};


  let a: Omit<InteractiveMessageModalsProps, 'mode'>
  
export type GetExtendsTypeModal<T> = Omit<T, 'mode' > & Omit<InteractiveMessageModalsProps, 'mode'> & Omit<InteractiveMessageControl, 'isAlert'>




export type AddMessageFn = (payload: Omit<InteractiveMessageStateProps, 'id' | 'isExiting'>) => void 

type ShowDeleteModalProps =  Omit<InteractiveMessageItemDelete, 'mode' | 'severity'>;
type ShowUpdateModalProps =  Omit<InteractiveMessageItemUpdate, 'mode' | 'severity'>;
type ShowSuccessModalProps =  Omit<InteractiveMessageItemSuccess, 'mode' | 'severity'>;

type ShowModalProps = InteractiveMessageModalsProps
// & ShowDeleteModalProps 
// & ShowUpdateModalProps 
// & ShowSuccessModalProps 
// & InteractiveMessageModalsProps 



export interface InteractiveMessageContextProps {
  // addMessage: (config: Omit<InteractiveMessageModalsProps, 'id'>) => void;
  removeMessage: (id: string, viewMessage: "alert" | "modal") => void;
  showAlert: (config: InteractiveMessageAlertProps) => void;
  showAlertDeleteCountdown: (config: DeleteCountdownAlertProps & {message: SnackbarMessage}) => void;

  showModal: (config: ShowModalProps) => void;
  showSuccessModal: (config:ShowSuccessModalProps) => void;
  showDeleteModal: (config: ShowDeleteModalProps) => void;
  showUpdateModal: (config:ShowUpdateModalProps) => void;
  clearAll: () => void;
}

