import { useState, useCallback, useEffect, useRef } from "react";
import { SocketApi } from "../../SocketApi";
import type { ResultUseRequestSocketApi, UseRequestSocketOptions } from "./useRequestSocketApi.types";
import type { BasePayloadSocket } from "../../SocketApi.types";
import { socketSelectors, useSocketSelector } from "@libs/NetworkAndSocket/Socket/store/socket.store";

interface StateTypes<D> {
  data: D | null;
  error: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const useRequestSocketApi = <P extends BasePayloadSocket, Data extends BasePayloadSocket>(payload: P, options: UseRequestSocketOptions<Data> = {}) => {
  const keyRequest = payload.action;
  const { skip = false, timeout = 5000 } = options;

  // Объединяем состояния в один useState для минимизации ререндеров
  const [state, setState] = useState<StateTypes<Data>>({
    data: null,
    error: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const isReadySocket = useSocketSelector(socketSelectors.getStatusReady);
  const statusConnect = useSocketSelector(socketSelectors.getStatusConnectSocket);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Выносим стабильные значения в ref
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const executeRequest = useCallback(async () => {
    if (skip) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
      isError: false,
      isSuccess: false,
      error: "",
      data: null,
    }));

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const response = await SocketApi.request<P, Data>(payload, { timeout, signal });

      if (signal.aborted) return;

      setState((prev) => ({
        ...prev,
        data: response,
        isSuccess: true,
        isLoading: false,
      }));

      optionsRef.current.onSuccess?.(response);
    } catch (err) {
      if (signal.aborted) return;

      const error = err instanceof Error ? err.message : String(err);
      setState((prev) => ({
        ...prev,
        error,
        isError: true,
        isLoading: false,
      }));

      optionsRef.current.onError?.(error);
    }
  }, [skip, keyRequest, payload, timeout]); // Убрали onSuccess, onError из зависимостей

  // Эффект для автоматического выполнения
  useEffect(() => {
    if (!skip && isReadySocket) {
      executeRequest();
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [executeRequest, skip, isReadySocket]);

  useEffect(() => {
    if (!isReadySocket && statusConnect === "pending") {
      setState((prev) => ({
        ...prev,
        isError: false,
        isSuccess: false,
        error: "Потеряно соединение с сервером",
      }));
    }
  }, [isReadySocket, statusConnect]);

  const refetch = useCallback(() => {
    abortControllerRef.current?.abort();
    return executeRequest();
  }, [executeRequest]);

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
    setState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  return {
    ...state,
    refetch,
    abort,
  };
};


export const createRequestSocketApi = <P extends BasePayloadSocket, D extends BasePayloadSocket>(p: P, d?: UseRequestSocketOptions<D>) => useRequestSocketApi<P, D>(p, d);

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
