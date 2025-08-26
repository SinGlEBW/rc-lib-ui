import { useState, useEffect, useCallback, useRef, type Dispatch, type SetStateAction } from 'react';
import type { NetworkState, UseNetworkStatusConfig } from './useNetworkStatus.types';

const urls = [ 'https://www.gstatic.com/generate_204', 'https://connectivitycheck.gstatic.com/generate_204','/favicon.ico' ];
const getFetchOptions = (controller: AbortController) => ({
  method: 'HEAD',
  cache: 'no-store',
  signal: controller.signal,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
} as const);


export function setStateDecorator<T, D> (state:T, setState:Dispatch<SetStateAction<D>>){
  return (payload: Partial<typeof state>) => setState((prev) => ({...prev, ...payload}))
}; 


export const useNetworkStatus = ({ watch = true, timeout = 5000, checkInterval = 10000, ...props } : UseNetworkStatusConfig) => {  
  const [networkState, setNetworkState] = useState<NetworkState>({ isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true });
  const setNetworkStateHelpers = setStateDecorator(networkState, setNetworkState);
  const checkRef = useRef<number>();
  const isMounted = useRef(true);


  const checkConnection = useCallback(async (): Promise<boolean> => {
    if (!isMounted.current) return false;
    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(url, getFetchOptions(controller));
        clearTimeout(timeoutId);
        if (response.status >= 200 && response.status < 400) { return true; }
      } catch (error) { continue; }
    }
    return false;
  }, [timeout]);


  const updateNetworkStatus = useCallback(async () => {
    const wasOnline = networkState.isOnline;
    const isNowOnline = await checkConnection();
    
    if (!isMounted.current) return;
    
    if (wasOnline !== isNowOnline) {
      const now = new Date();
      setNetworkStateHelpers({
        isOnline: isNowOnline,
        ...(isNowOnline ? { onlineAt: now } : { offlineAt: now }),
        ...(!isNowOnline ? { onlineAt: undefined } : { offlineAt: undefined })
      });
    }
  }, [networkState.isOnline, checkConnection]);

  // Периодическая проверка
  const startPeriodicCheck = useCallback(() => {
    if (checkRef.current) { clearInterval(checkRef.current); }
    checkRef.current = window.setInterval(updateNetworkStatus, checkInterval);
  }, [checkInterval, updateNetworkStatus]);

  useEffect(() => {
    isMounted.current = true;
    const handleOnline = () => {
      isMounted.current && setNetworkStateHelpers({ isOnline: true, onlineAt: new Date(), offlineAt: undefined }); 
    };
    const handleOffline = () => {
      isMounted.current && setNetworkStateHelpers({ isOnline: false, offlineAt: new Date(), onlineAt: undefined }); 
    };

    if (watch) {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // NetworkInformation API если доступно
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.addEventListener) {
          connection.addEventListener('change', updateNetworkStatus);
        }
      }

      // Начальная проверка и запускаем периодическую проверку
      updateNetworkStatus();
      startPeriodicCheck();
    }

    return () => {
      isMounted.current = false;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.removeEventListener) {
          connection.removeEventListener('change', updateNetworkStatus);
        }
      }
      
      if (checkRef.current) { clearInterval(checkRef.current); }
    };
  }, [watch, updateNetworkStatus, startPeriodicCheck]);

  return { ...networkState, checkConnection: updateNetworkStatus };
};