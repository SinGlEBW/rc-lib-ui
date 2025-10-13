export interface UseRequestSocketOptions<Data = any> {
  skip?: boolean;
  timeout?: number;
  onSuccess?: (data: Data) => void;
  onError?: (error: Error) => void;
}

export interface ResultUseRequestSocketApi<Data = any> {
    data: Data | null;
    error: Error | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    refetch: () => Promise<void>;
    abort: () => void;
}