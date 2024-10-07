import { useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

export interface ControlStatusItemProps {
  render(p: {
    is: boolean,
    setStatus: Dispatch<SetStateAction<boolean>>,
    handleToggle: () => void
  }): ReactNode;
}

export const ControlStatusItem = ({ render }: ControlStatusItemProps) => {
  const [is, setStatus] = useState(false);
  const handleToggle = () => {
    setStatus((is) => !is)
  }
  return render({ is, setStatus, handleToggle })
}