export type NetworkStatus = 'unknown' | 'none' | 'wifi' | '2g' | '3g' | '4g';

export interface NetworkInfo{
  isNetwork: boolean;
  typeNetwork: string;
}

export interface NetworkControlsStateProps extends NetworkInfo{
  isActiveDelay:boolean;
  // keyNameSystem: string;
  // listControlNetwork: NetworkItemListControls[]
}
export interface NetworkControlsConfigProps{
  interval?: number;
  isAutoStop?: boolean;
}

export type NetworkMonitorCallback = (info: NetworkInfo) => void;

interface NetworkMonitorCallbackIntervalConfig{
  reset: () => void
  sendNetworkInfo: NetworkMonitorCallback
}
export type NetworkMonitorCallbackInterval = (config:NetworkMonitorCallbackIntervalConfig) => void;

