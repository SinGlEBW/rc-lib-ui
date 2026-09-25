import type { SocketMessage } from '../../SocketApi.types';

export interface UseRequestSocketOptions<Data = any, P = any,> {
  skip?: boolean;
  timeout?: number;
  onSuccess?: (data: SocketMessage<P, Data>) => void;
  onError?: (error: string) => void;
}

export interface ResultUseRequestSocketApi<Data = any> {
    data: Data | null;
    error: string;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    refetch: () => Promise<void>;
    abort: () => void;
}