

import { useInteractiveMessage } from '@libs/ControlCards/InteractiveMessages/controls';
import { useCallback } from "react";
import uuid4 from "uuid4";
import type { KeysListDell } from './deleting/store/deleting.types';
import { useDeleting } from './deleting/useDeleting';
import { useSelected } from '../useSelected/useSelected';

type ContrlsListProps = Record<"name" | "id", string>[];
interface UseControlCardsProps {
  keyAction: KeysListDell;
  list: (ContrlsListProps[number] & { [key in string]: any })[];
  onExpire(items: ContrlsListProps): void;
  setMessage(items: ContrlsListProps): string;
  durationDelete?: number;
  timeoutSuccess?: number;
}

export const useControlCards = ({ list, keyAction, setMessage, onExpire, durationDelete = 5000, timeoutSuccess = 2000 }: UseControlCardsProps) => {
  const { showDeleteModal, showAlert, showAlertDeleteCountdown } = useInteractiveMessage();

  const selectedData = useSelected(list);
  const deleting = useDeleting({ sectionDel: keyAction });

  const onDelete = useCallback(() => {
    showDeleteModal({
      message: `Вы действительно хотите удалить ?`,
      title: "",
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
          message: setMessage(items),
          onExpire: () => {
            onExpire(items);

            clearDeletingActive();
            showAlert({
              severity: "success",
              message: "Успешное удаление",
              timeout: timeoutSuccess,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
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
  }, [deleting, durationDelete, list, onExpire, selectedData, setMessage, showAlert, showAlertDeleteCountdown, showDeleteModal, timeoutSuccess]);

  return {
    onDelete,
    checkIsReadyDelete: deleting.checkIsReadyDelete,
    ...selectedData,
  };
};
