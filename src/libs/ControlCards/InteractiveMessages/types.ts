import type { ButtonProps } from "@mui/material";
import type { OptionsObject, SnackbarMessage, VariantType } from "notistack";
import type { ComponentType, ReactNode } from "react";
import { DeleteCountdownAlertProps } from "./alerts/Alerts.styled";

type ViewMessage = "modal" | "fullModal";

export interface InteractiveMessageItemCommon {
  message: string | ReactNode;
  timeout?: number;
  dismissible?: boolean;
}

interface ControlModal{
   control: {
    hideMessage: (id: string) => void;
  };
}

type InteractiveMessageControlBase = {
  id: string;
  isExiting: boolean;
};


type GetExtendsTypeModal<T> = Omit<T, "mode"> & InteractiveMessageControlBase;

export interface InteractiveModalDefaultProps extends ControlModal {
  modal: GetExtendsTypeModal<InteractiveMessageItemDefault>
}
export interface InteractiveModalInfoProps extends ControlModal {
  modal: GetExtendsTypeModal<InteractiveMessageItemInfo>
}
export interface InteractiveModalSuccessProps extends ControlModal {
  modal: GetExtendsTypeModal<InteractiveMessageItemSuccess>
}
export interface InteractiveModalDeleteProps extends ControlModal {
  modal: GetExtendsTypeModal<InteractiveMessageItemDelete>
}
export interface InteractiveModalUpdateProps extends ControlModal {
  modal: GetExtendsTypeModal<InteractiveMessageItemUpdate>
}




export interface ExtendsModalMap {}
export interface CustomModalsMap extends ExtendsModalMap{
  default?: ComponentType<InteractiveModalDefaultProps>;
  success?: ComponentType<InteractiveModalSuccessProps>
  delete?: ComponentType<InteractiveModalDeleteProps>;
  update?: ComponentType<InteractiveModalUpdateProps>;
  info?: ComponentType<InteractiveModalInfoProps>;
}

export type DefaultModals_OR = keyof CustomModalsMap;

export type DefaultShowAlertsVariant = Exclude<VariantType, "deleteCountdown">;

export type InteractiveMessageAlertProps = InteractiveMessageItemCommon &
  OptionsObject<DefaultShowAlertsVariant> & {
    animation?: "Fade" | "Grow" | "Zoom" | "Slide";
    variant?: DefaultShowAlertsVariant;
    // variant?: "filled" | "standard" | "outlined";
    // severity?: DefaultShowAlertsVariant
  };

interface ViewModal extends InteractiveMessageItemCommon {
  title?: string;
  view?: "modal" | "fullModal";
  severity?: "success" | "error" | "warning" | "info";
  key?: string;
  onExited?(): void;
  mode: DefaultModals_OR;
  // closeByDialog?: boolean;
}

interface InteractiveMessageItemUpdate extends ViewModal {
  mode: "update";
  onConfirm?(): void;
  onCancel?(): void;
  visual?: "variant1";
}

interface InteractiveMessageItemInfo extends ViewModal {
  mode: "info";
  confirmText?: string;
  onConfirm?(): void;
  onCancel(): void;
  visual?: "variant1";
}

interface InteractiveMessageItemDelete extends ViewModal {
  // itemsDelete: PayloadDeleteItems['items'];
  mode: "delete";
  onConfirm(): void;
  onCancel?(): void;
  confirmText?: string;
  cancelText?: string;

  // listSection
  visual?: "variant1"; //можно добавлять
}

interface InteractiveMessageItemSuccess extends ViewModal {
  mode: "success";
  onCancel?(): void;
  buttonText?: string;
  visual?: "variant1" | "variant2" | "variant3" | "variant4" | "variant5" | "variant6";
}

interface InteractiveMessageItemDefault extends ViewModal {
  mode: "default" | keyof ExtendsModalMap;
  actions: (Partial<Pick<ButtonProps, "sx" | "onClick">> & { text: string })[];
  visual?: "variant1";
}

export type InteractiveMessageModalsProps =
  | InteractiveMessageItemUpdate
  | InteractiveMessageItemInfo
  | InteractiveMessageItemDelete
  | InteractiveMessageItemSuccess
  | InteractiveMessageItemDefault;




export type InteractiveMessageStateProps = InteractiveMessageControlBase & Omit<InteractiveMessageModalsProps, "view"> & { view: ViewMessage };

export type ModalCustomItem_P = InteractiveMessageControlBase & InteractiveMessageModalsProps;


export interface ModalRendererProps extends ControlModal {
  modal: ModalCustomItem_P;
  CustomModals?: CustomModalsMap;
}


export type AddMessageFn = (payload: Omit<InteractiveMessageStateProps, "id" | "isExiting">) => void;

type ShowDeleteModalProps = Omit<InteractiveMessageItemDelete, "mode" | "severity">;
type ShowUpdateModalProps = Omit<InteractiveMessageItemUpdate, "mode" | "severity">;
type ShowSuccessModalProps = Omit<InteractiveMessageItemSuccess, "mode" | "severity">;

type ShowModalProps = InteractiveMessageModalsProps;


export interface InteractiveMessageContextProps {
  // addMessage: (config: Omit<InteractiveMessageModalsProps, 'id'>) => void;

  removeMessage: (id: string, viewMessage: "alert" | "modal") => void;
  showAlert: (config: InteractiveMessageAlertProps) => void;
  showAlertDeleteCountdown: (config: DeleteCountdownAlertProps & { message: SnackbarMessage }) => void;

  showModal: (config: ShowModalProps) => void;
  showSuccessModal: (config: ShowSuccessModalProps) => void;
  showDeleteModal: (config: ShowDeleteModalProps) => void;
  showUpdateModal: (config: ShowUpdateModalProps) => void;
  clearAll: () => void;
}




