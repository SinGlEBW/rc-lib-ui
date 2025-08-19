type NetworkActive_OR = '' | 'active';
type NetworkKey_OR = '' | 'online' | 'offline';

interface InitialStateProps {
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
  setTypeNetwork: (payload: Pick<InitialStateProps,'typeNetwork'>) => void;  
  setNetworkStatus: (payload: Pick<InitialStateProps,'isNetwork'>) => void;      
  setInfoNetworkStatus: (payload: Pick<InitialStateProps, 'infoNetwork'>) => void;      
}


export { type InitialStateProps, type NetworkActions };