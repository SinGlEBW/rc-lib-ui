import { useInteractiveMessage } from "@libs/ControlCards/InteractiveMessages/controls";
import { useCallback } from "react";
import uuid4 from "uuid4";
import type { KeysListDell } from "./deleting/store/deleting.types";
import { useDeleting } from "./deleting/useDeleting";
import { useSelected } from "../useSelected/useSelected";
import type { InteractiveMessageAlertProps, InteractiveMessageContextProps } from "../InteractiveMessages";

type ControlCardsListItem = Record<"id", string> & { [key in string]: any };
interface HelperControl extends Pick<InteractiveMessageContextProps, 'showModal' | 'showAlert'>{
  delPackID: string;
  clearDeletingActive: () => void;
  deletingPackID: (payload: { delPackID: string }) => void;
}

interface UseControlCardsProps {
  keyAction: KeysListDell;
  list: ControlCardsListItem[];
  onEndTimeout(items: ControlCardsListItem[], helperControl: HelperControl): void;
  setMessageProgress(items: ControlCardsListItem[]): string;
  durationDelete?: number;
  timeoutSuccess?: number;
  messageDelete?: () => React.ReactNode;
  title?: string | (() => string);
  isDeletingByTimeout?: boolean;
  optionAlert?: Pick<InteractiveMessageAlertProps, "anchorOrigin"> & { isOffAlertBySuccess?: boolean };
}
useInteractiveMessage
export const useControlCards = ({
  list,
  keyAction,
  setMessageProgress,
  onEndTimeout,
  durationDelete = 5000,
  timeoutSuccess = 2000,
  messageDelete,
  title,
  optionAlert,
  isDeletingByTimeout = true,
}: UseControlCardsProps) => {
  const { showDeleteModal, showAlert, showModal, showAlertDeleteCountdown } = useInteractiveMessage();

  const selectedData = useSelected(list);
  const deleting = useDeleting({ sectionDel: keyAction });

  const showModalDelete = useCallback(() => {
    showDeleteModal({
      message: typeof messageDelete === "function" ? messageDelete() : `Вы действительно хотите удалить ?`,
      title: typeof title === "function" ? title() : title,
      onConfirm: () => {
        const items = selectedData.selectedIds.map((selectId) => {
          const findItem = list.find((item) => item.id === selectId)!;
          return findItem;
        });

        selectedData.clearSelection();
        const delPackID = uuid4();
        deleting.setItems({ delPackID, items });

        const clearDeletingActive = () => {
          deleting.removeItems({ delPackID });
        };

        const deletingPackID = ({ delPackID }) => {
          deleting.removeItems({ delPackID });
        };

        showAlertDeleteCountdown({
          duration: durationDelete,
          message: setMessageProgress(items),
          onExpire: () => {
            onEndTimeout(items, { clearDeletingActive, deletingPackID, showAlert, showModal, delPackID });
            if (isDeletingByTimeout) {
              clearDeletingActive();
              !optionAlert?.isOffAlertBySuccess &&
                showAlert({
                  variant: "success",
                  message: "Успешное удаление",
                  timeout: timeoutSuccess,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  ...optionAlert,
                });
            }
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
  }, [deleting, durationDelete, list, onEndTimeout, selectedData, setMessageProgress, showAlert, showAlertDeleteCountdown, showDeleteModal, timeoutSuccess]);

  return {
    showModalDelete,
    checkIsReadyDelete: deleting.checkIsReadyDelete,
    ...selectedData,
  };
};
