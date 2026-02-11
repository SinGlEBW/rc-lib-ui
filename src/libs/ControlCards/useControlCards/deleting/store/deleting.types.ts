
export type KeysListDell = ''

interface DeleteItem_P {
  id: string;
  name?: string;
}

export interface ItemPackDel_P {
  delPackID: string;
  status: "deleting" | "deleteend";
  items: DeleteItem_P[];
}

interface BaseDeletePayload { 
  delPackID: string;
  sectionDel: KeysListDell;
}
interface PayloadDelete {
  SetItem: BaseDeletePayload & {
    items: DeleteItem_P[];
  };
  SetActiveDelete: BaseDeletePayload;
  RemoveItem: BaseDeletePayload;
  RemoveAll: Pick<BaseDeletePayload, 'sectionDel'>;
}

export type InitialStatePropsDeleting = {
  [key in KeysListDell]?: ItemPackDel_P[];
};


export interface DeletingActionsProps {
  resetState: () => void;
  setItems: (payload: PayloadDelete["SetItem"]) => void;
  setActiveDelete: (payload: PayloadDelete["SetActiveDelete"]) => void;
  removeItems: (payload: PayloadDelete["RemoveItem"]) => void;
  removeAll: (payload: PayloadDelete["RemoveAll"]) => void;
}




