// deleting.store.ts
import { create } from 'zustand';
import { defaultInitialState, initialState } from './deleting.initial';
import type { 
  DeletingActionsProps,
  InitialStatePropsDeleting,
  ItemPackDel_P,
  KeysListDell, 

} from './deleting.types';

export const deletingStore = create<InitialStatePropsDeleting>(() => (initialState));

export const deletingActions: DeletingActionsProps = {
  resetState: () => deletingStore.setState(defaultInitialState),
  
  setItems: ({ sectionDel, items, delPackID }) => 
    deletingStore.setState((state) => {
      if (!Array.isArray(state[sectionDel])) {
        state[sectionDel] = [];
      }
      
      const list = state[sectionDel];
      const findInxPackDel = list.findIndex((items) => items.delPackID === delPackID);
      const payloadSaveDel:ItemPackDel_P = { items, delPackID, status: "deleting" };
      
      if (findInxPackDel !== -1) {
        state[sectionDel]![findInxPackDel] = payloadSaveDel;
      } else {
        state[sectionDel].push(payloadSaveDel);
      }
      
      return state;
    }),
  
  setActiveDelete: ({ sectionDel, delPackID }) =>
    deletingStore.setState((state) => {
      if (Array.isArray(state[sectionDel])) {
        const findInxPackDel = state[sectionDel].findIndex((items) => items.delPackID === delPackID);
        if (findInxPackDel !== -1) {
          const item = state[sectionDel]![findInxPackDel];
          state[sectionDel]![findInxPackDel] = { ...item, status: "deleteend" };
        }
      }
      return state;
    }),
  
  removeItems: ({ sectionDel, delPackID }) =>
    deletingStore.setState((state) => {
      if (Array.isArray(state[sectionDel])) {
        state[sectionDel] = state[sectionDel].filter((items) => items.delPackID !== delPackID);
      }
      return state;
    }),
  
  removeAll: ({ sectionDel }) =>
    deletingStore.setState((state) => {
      state[sectionDel] = [];
      return state;
    }),
};


export const deletingSelectors = {
  getDeletingItems: (state: InitialStatePropsDeleting, sectionDel: KeysListDell) => 
    Array.isArray(state[sectionDel]) 
      ? state[sectionDel].flatMap((item) => item.status === "deleting" ? item.items : [])
      : [],
  
  getDeletingPackages: (state: InitialStatePropsDeleting, sectionDel: KeysListDell) => 
    state[sectionDel] || [],
  
  getDeletingStatus: (state: InitialStatePropsDeleting, sectionDel: KeysListDell, delPackID: string) => {
    const packages = state[sectionDel];
    const found = packages?.find(pkg => pkg.delPackID === delPackID);
    return found?.status || null;
  },
  
  hasActiveDeletions: (state: InitialStatePropsDeleting, sectionDel: KeysListDell) => {
    const packages = state[sectionDel];
    return packages?.some(pkg => pkg.status === "deleting") || false;
  },
  
  getCountDeletingItems: (state: InitialStatePropsDeleting, sectionDel: KeysListDell) => {
    const packages = state[sectionDel];
    return packages?.reduce((acc, pkg) => 
      pkg.status === "deleting" ? acc + pkg.items.length : acc, 0
    ) || 0;
  }
};

export const useDeletingSelector = <TSelected>(
  selector: (state: InitialStatePropsDeleting) => TSelected
): TSelected => deletingStore(selector);