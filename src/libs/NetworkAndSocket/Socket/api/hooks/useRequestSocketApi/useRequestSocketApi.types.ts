export interface UseRequestSocketOptions<Data = any> {
  skip?: boolean;
  timeout?: number;
  onSuccess?: (data: Data) => void;
  onError?: (error: Error) => void;
}