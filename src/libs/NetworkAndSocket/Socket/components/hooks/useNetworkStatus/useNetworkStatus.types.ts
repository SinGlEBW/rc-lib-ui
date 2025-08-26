export interface NetworkState {
  isOnline: boolean;
  offlineAt?: Date;
  onlineAt?: Date;
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
  type?: string;
}

export interface UseNetworkStatusConfig {
  watch?: boolean;
  timeout?: number;
  checkInterval?: number;
}
