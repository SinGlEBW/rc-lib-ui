import { useState, useCallback, useEffect, useRef } from 'react';
import { SocketApi } from '../../SocketApi';
import type { UseRequestSocketOptions } from './useRequestSocketApi.types';
import type { BasePayloadSocket } from '../../SocketApi.types';


//INFO: Пока не используться. Универсальный хук
export const useRequestSocketApi = <P extends BasePayloadSocket, Data extends BasePayloadSocket>(
  keyRequest: string,
  payload: P,
  options: UseRequestSocketOptions<Data> = {}
) => {
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
        keyRequest,
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

