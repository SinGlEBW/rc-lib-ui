type NetworkActive_OR = '' | 'active';
type NetworkKey_OR = '' | 'online' | 'offline';

interface InitialStatePropsNetwork {
  isNetwork: boolean | null;
  typeNetwork: string;
  infoNetwork: {
    online: NetworkActive_OR;
    offline: NetworkActive_OR;
    action: NetworkKey_OR;
    status: null | boolean;
    titleOnline: string;
    titleOffline: string;
  }
}

interface NetworkActions {
  resetState: () => void;
  setTypeNetwork: (payload: Pick<InitialStatePropsNetwork,'typeNetwork'>) => void;  
  setNetworkStatus: (payload: Pick<InitialStatePropsNetwork,'isNetwork'>) => void;      
  setInfoNetworkStatus: (payload: Pick<InitialStatePropsNetwork, 'infoNetwork'>) => void;      
}


export { type InitialStatePropsNetwork, type NetworkActions };
