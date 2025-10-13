import { useState, useCallback, useEffect, useRef } from 'react';
import { SocketApi } from '../../SocketApi';
import type { ResultUseRequestSocketApi, UseRequestSocketOptions } from './useRequestSocketApi.types';
import type { BasePayloadSocket } from '../../SocketApi.types';





export const useRequestSocketApi = <P extends BasePayloadSocket, Data extends BasePayloadSocket>(
  payload: P,
  options: UseRequestSocketOptions<Data> = {}
) => {
  const keyRequest = payload.action;
  const { skip = false, timeout = 5000, onSuccess, onError } = options;
  
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  // const messageHandlerRef = useRef<((res: WsApi_Response<P, Data>) => void) | null>(null);

  const executeRequest = useCallback(async () => {
    if (skip) return;
    
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);
    setData(null);
    
    // Создаем AbortController
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const response = await SocketApi.request<P, Data>(
        payload, 
        { timeout, signal }
      );
      
      if (signal.aborted) return;
      
      setData(response);
      setIsSuccess(true);
      onSuccess?.(response);
      
    } catch (err) {
      if (signal.aborted) return;
      
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setIsError(true);
      onError?.(error);
      
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [skip, keyRequest, payload, timeout, onSuccess, onError]);

  // Эффект для автоматического выполнения
  useEffect(() => {
    if (!skip) {
      executeRequest();
    }
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [executeRequest, skip]);

  const refetch = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    return executeRequest();
  }, [executeRequest]);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, isError, isSuccess, refetch, abort, };
};

export const createRequestSocketApi = <P extends BasePayloadSocket, D extends BasePayloadSocket>(
  p: P, 
  d?: UseRequestSocketOptions<D>
) => useRequestSocketApi<P, D>(p, d);

// export const createRequestSocketApi = <P extends BasePayloadSocket, D extends BasePayloadSocket>(
//   p: P, 
//   d?: UseRequestSocketOptions<D>
// ): ResultUseRequestSocketApi<D> => {
//   const result = useRequestSocketApi<P, D>(p, d);
  
//   // Явно возвращаем типизированный результат
//   return {
//     ...result,
//     data: result.data as D | null,
//   };
// };
// export const createRequestSocketApi = <P extends BasePayloadSocket, D extends BasePayloadSocket>(
//   p: P, 
//   d?: UseRequestSocketOptions<D>
// ) => {
//   const result = useRequestSocketApi<P, D>(p, d);
  
//   // Явно возвращаем типизированный результат
//   return {
//     data: result.data as D | null,
//     error: result.error,
//     isLoading: result.isLoading,
//     isError: result.isError,
//     isSuccess: result.isSuccess,
//     refetch: result.refetch,
//     abort: result.abort,
//   };
// };

// interface CachedData<Response> {
//   data: Response;
//   timestamp: number;
//   expiresAt: number;
// }


// const globalCache = new Map<string, CachedData<any>>();
// export const cacheManager = {
//   // Очистить весь кеш
//   clearAll: () => globalCache.clear(),
  
//   // Очистить кеш по паттерну действия
//   clearByAction: (actionPattern: string | RegExp) => {
//     for (const [key] of globalCache) {
//       if (key.startsWith(actionPattern as string) || 
//           (actionPattern instanceof RegExp && actionPattern.test(key))) {
//         globalCache.delete(key);
//       }
//     }
//   },
  
//   // Получить статистику кеша
//   getStats: () => {
//     const now = Date.now();
//     let valid = 0;
//     let expired = 0;
    
//     for (const [, cached] of globalCache) {
//       if (now > cached.expiresAt) {
//         expired++;
//       } else {
//         valid++;
//       }
//     }
    
//     return { total: globalCache.size, valid, expired };
//   }
// };