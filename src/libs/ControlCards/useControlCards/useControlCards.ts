

import { useInteractiveMessage } from '@libs/ControlCards/InteractiveMessages/controls';
import { useCallback } from "react";
import uuid4 from "uuid4";
import type { KeysListDell } from './deleting/store/deleting.types';
import { useDeleting } from './deleting/useDeleting';
import { useSelected } from '../useSelected/useSelected';
import type { InteractiveMessageAlertProps } from '../InteractiveMessages';

type ContrlsListProps = Record<"name" | "id", string>[];
interface UseControlCardsProps {
  keyAction: KeysListDell;
  list: (ContrlsListProps[number] & { [key in string]: any })[];
  onExpire(items: ContrlsListProps): void;
  setMessageProgress(items: ContrlsListProps): string;
  durationDelete?: number;
  timeoutSuccess?: number;
  messageDelete?: (() => React.ReactNode);
  title?: string | (() => string);
  optionAlert?: Pick<InteractiveMessageAlertProps, 'anchorOrigin'>
}

export const useControlCards = ({ 
  list, keyAction, setMessageProgress, 
  onExpire, durationDelete = 5000, timeoutSuccess = 2000,
  messageDelete, title, optionAlert
 }: UseControlCardsProps) => {
  const { showDeleteModal, showAlert, showAlertDeleteCountdown } = useInteractiveMessage();

  const selectedData = useSelected(list);
  const deleting = useDeleting({ sectionDel: keyAction });

  const showModalDelete = useCallback(() => {
    showDeleteModal({
      message: typeof messageDelete === "function" ? messageDelete() : `Вы действительно хотите удалить ?`,
      title: typeof title === "function" ? title() : title,
      onConfirm: () => {
        const items = selectedData.selectedIds.map((selectId) => {
          const { id, name } = list.find((item) => item.id === selectId)!;
          return { id, name };
        });

        selectedData.clearSelection();
        const delPackID = uuid4();
        deleting.setItems({ delPackID, items });

        const clearDeletingActive = () => {
          deleting.removeItems({ delPackID });
        };

        showAlertDeleteCountdown({
          duration: durationDelete,
          message: setMessageProgress(items),
          onExpire: () => {
            onExpire(items);
            clearDeletingActive();
            showAlert({
              variant: "success",
              message: "Успешное удаление",
              timeout: timeoutSuccess,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              ...optionAlert
            });
          },
          onUndo: () => {
            clearDeletingActive();
          },
        });
      },
      onCancel() {
        console.dir("No");
      },
    });
  }, [deleting, durationDelete, list, onExpire, selectedData, setMessageProgress, showAlert, showAlertDeleteCountdown, showDeleteModal, timeoutSuccess]);

  return {
    showModalDelete,
    checkIsReadyDelete: deleting.checkIsReadyDelete,
    ...selectedData,
  };
};
