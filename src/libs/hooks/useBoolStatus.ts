import { useCallback, useState } from 'react';

export const useBoolStatus = () => {
   const [is, setIsStatus] = useState(false);
   const handleTrue = useCallback(() => { setIsStatus(true); }, []);
   const handleFalse = useCallback(() => { setIsStatus(false); }, []) 
   return [is, handleTrue, handleFalse ] as const
}

export type BoolStatusPropsResult = ReturnType<typeof useBoolStatus>;