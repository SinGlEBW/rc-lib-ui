import { useInteractiveMessage } from "@libs/ControlCards/InteractiveMessages/controls";
import { useCallback } from "react";
import uuid4 from "uuid4";
import type { KeysListDell } from "./deleting/store/deleting.types";
import { useDeleting } from "./deleting/useDeleting";
import { useSelected } from "../useSelected/useSelected";
import type { InteractiveMessageAlertProps, InteractiveMessageContextProps } from "../InteractiveMessages";


type ControlCardsListItem = Record<'id', string> & { [key in string]: any };

interface HelperControl extends Pick<InteractiveMessageContextProps, 'showModal' | 'showAlert'> {
  delPackID: string;
  clearDeletingActive: () => void;
  deletingPackID: (payload: { delPackID: string }) => void;
}


type IsAlertEnable = {
  isEnable?: true;
  timeout?: number;
} & Pick<InteractiveMessageAlertProps, 'anchorOrigin'>

type IsAlertDisable = {
  isEnable?: false; 
  timeout?: never;
}

type IsDeletingByEndTimeoutDurationTrue = {
  isDeletingByEndTimeoutDuration?: true;
  slotItems?: {
    alert?: IsAlertEnable | IsAlertDisable
  };
}
type IsDeletingByEndTimeoutDurationFalse = {
  isDeletingByEndTimeoutDuration?: false;
  timeoutSuccess?: never;
}

type IsDurationDeleteTrue = (IsDeletingByEndTimeoutDurationTrue | IsDeletingByEndTimeoutDurationFalse) & {
  isDurationDelete: true;
  setMessageProgress(items: ControlCardsListItem[]): string;
  durationDelete?: number;
  onEndTimeoutDuration?(items: ControlCardsListItem[], helperControl: HelperControl): void;
  onComfirm: never;
}

type IsDurationDeleteFalse = {
  isDurationDelete: false;
  durationDelete?: never;
  onComfirm(items: ControlCardsListItem[], helperControl: HelperControl): void;
}


type UseControlCardsProps = {
  keyAction: KeysListDell;
  list: ControlCardsListItem[];
  onCancel?(): void;
  durationDelete?: number;
  messageDelete?: () => React.ReactNode;
  title?: string | (() => string);
} & (IsDurationDeleteTrue | IsDurationDeleteFalse);


export const useControlCards = ({
  list,
  keyAction,
  onCancel,
  durationDelete = 5000,
  messageDelete,
  title,
  ...props
}: UseControlCardsProps) => {
  const { showDeleteModal, showAlert, showModal, showAlertDeleteCountdown } = useInteractiveMessage();

  const selectedData = useSelected(list);
  const deleting = useDeleting({ sectionDel: keyAction });

  const getItemsSelected = useCallback(() => {
    const items = selectedData.infoRef.current.selectedIds.map(selectId => {
      const findItem = list.find(item => item.id === selectId)!;
      return findItem;
    });
    return items;
  }, [list, selectedData.infoRef]);

  const showModalDelete = useCallback(() => {
    showDeleteModal({
      message: typeof messageDelete === 'function' ? messageDelete() : `Вы действительно хотите удалить ?`,
      title: typeof title === 'function' ? title() : title,
      onConfirm: () => {
        const items = getItemsSelected();
        selectedData.clearSelection();
        const delPackID = uuid4();
        deleting.setItems({ delPackID, items });

        const clearDeletingActive = () => {
          deleting.removeItems({ delPackID });
        };

        const deletingPackID = ({ delPackID }) => {
          deleting.removeItems({ delPackID });
        };
        
        if(!props.isDurationDelete){ 
          props?.onComfirm && props?.onComfirm(items, { clearDeletingActive, deletingPackID, showAlert, showModal, delPackID });
          return;
        }
        showAlertDeleteCountdown({
          duration: durationDelete,
          message: props?.setMessageProgress(items),
          onExpire: () => {
            props?.onEndTimeoutDuration && props?.onEndTimeoutDuration(items, { clearDeletingActive, deletingPackID, showAlert, showModal, delPackID });
            if (props?.isDeletingByEndTimeoutDuration) {
              clearDeletingActive();
              !(props as IsDeletingByEndTimeoutDurationTrue)?.slotItems?.alert?.isEnable &&
                showAlert({
                  variant: 'success',
                  message: 'Успешное удаление',
                  timeout: (props as IsDeletingByEndTimeoutDurationTrue)?.slotItems?.alert?.timeout || 2000,
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  ...((props as IsDeletingByEndTimeoutDurationTrue)?.slotItems?.alert as IsAlertEnable)?.anchorOrigin,
                });
            }
          },
          onUndo: () => {//кнопка отмены на плашке с таймером
            clearDeletingActive();
          },
        });
      },
      onCancel() {
        selectedData.clearSelection();
        onCancel && onCancel();
      },
    });
  }, [
    deleting,
    durationDelete,
    list,
    props.isDurationDelete,
    selectedData,
    showAlert,
    showAlertDeleteCountdown,
    showDeleteModal,
    onCancel,
    getItemsSelected
  ]);

  return {
    showModalDelete,
    checkIsReadyDelete: deleting.checkIsReadyDelete,
    ...selectedData,
  };
};
