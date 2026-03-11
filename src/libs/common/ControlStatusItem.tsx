import { useCallback, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

export interface ControlStatusItemProps {
  defaultStatus?: boolean
  render(p: {
    is: boolean;
    id: string;
    handleToggle: () => void;
    setID: (id: string) => void;
  }): ReactNode;
}

export const ControlStatusItem = ({ render, defaultStatus = false }: ControlStatusItemProps) => {
  const [state, setState] = useState({is: defaultStatus, id: ''});
  const handleToggle = useCallback(() => {
    setState((prev) => ({ ...prev, is: !prev.is }));
  },[])
  const setID = useCallback((id:string) => {
    setState((prev) => ({ ...prev, id }));
  },[])
 
  return render({ ...state, setID, handleToggle })
}