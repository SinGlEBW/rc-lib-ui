import React, { useCallback } from "react";
import { deletingActions, deletingSelectors, useDeletingSelector } from "./store/deleting.store";
import { KeysListDell } from "./store/deleting.types";
import { useShallow } from "zustand/react/shallow";

interface UseDeletingProps {
  sectionDel: KeysListDell;
}

export const useDeleting = (props: UseDeletingProps) => {
  const listDel = useDeletingSelector(useShallow((state) => deletingSelectors.getDeletingItems(state, props.sectionDel)));
  const checkIsReadyDelete = useCallback((id: string) => listDel.some((item) => item.id === id), [listDel]);
  const isDeleting = !!listDel.length;

  const setItems = useCallback((params: Omit<Parameters<typeof deletingActions.setItems>[0], "sectionDel">) => {
    deletingActions.setItems({ sectionDel: props?.sectionDel, ...params });
  }, []);

  const removeItems = useCallback((params: Omit<Parameters<typeof deletingActions.removeItems>[0], "sectionDel">) => {
    deletingActions.removeItems({ sectionDel: props?.sectionDel, ...params });
  }, []);
  const removeAll = useCallback((params: Omit<Parameters<typeof deletingActions.removeAll>[0], "sectionDel">) => {
    deletingActions.removeAll({ sectionDel: props?.sectionDel, ...params });
  }, []);
  return { listDel, checkIsReadyDelete, isDeleting, setItems, removeItems, removeAll };
};
