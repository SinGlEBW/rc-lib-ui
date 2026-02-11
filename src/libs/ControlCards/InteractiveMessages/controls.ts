import { createContext, useContext } from 'react';
import { InteractiveMessageContextProps } from './types';

export const InteractiveMessageContext = createContext<InteractiveMessageContextProps | undefined>(undefined);

export const useInteractiveMessage = () => {
  const context = useContext(InteractiveMessageContext);
  if (!context) {
    throw new Error('useInteractiveMessage must be used within an InteractiveMessageProvider');
  }
 
  return context;
};
