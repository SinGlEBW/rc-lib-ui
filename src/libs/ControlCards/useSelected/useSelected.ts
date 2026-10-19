import React, { useCallback, useEffect, useRef, useState } from 'react';


export function useSelected<T extends Array<{ id: string } & {[key in any]: any}>>(list: T){
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const infoRef = useRef({ selectedIds, selectionMode });
  Object.assign(infoRef.current, { selectedIds, selectionMode });

  useEffect(() => {
    if (selectionMode && !selectedIds.length) {
      setSelectionMode(false);
    }
  }, [selectedIds, selectionMode])


  const handleSelect = useCallback((id: string) => {
    if (!selectionMode) {
      setSelectionMode(true);
    }
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter(selectedId => selectedId !== id));
      return;
    }
    setSelectedIds(prev => [...prev, id]);
  }, [selectionMode, selectedIds]);

  const handleDeselect = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter(selectedId => selectedId !== id));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
    setSelectionMode(false);
  }, []);

  const selectAll = useCallback(() => {
    const allIds = list.map(item => item.id);
    setSelectedIds(allIds);
  }, [list]);

  const checkSelected = useCallback((id: string) => selectedIds.includes(id), [selectedIds]);

  return { selectedIds, infoRef, selectionMode, handleSelect, handleDeselect, clearSelection, selectAll, checkSelected };
}

export type SelectedPropsResult = ReturnType<typeof useSelected>