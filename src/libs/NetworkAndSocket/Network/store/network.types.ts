type NetworkActive_OR = '' | 'active';
type NetworkKey_OR = '' | 'online' | 'offline';

interface NetworkInitialStateProps {
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

interface NetworkActionsProps {
  resetState: () => void;
  setTypeNetwork: (payload: Pick<NetworkInitialStateProps,'typeNetwork'>) => void;  
  setNetworkStatus: (payload: Pick<NetworkInitialStateProps,'isNetwork'>) => void;      
  setInfoNetworkStatus: (payload: Pick<NetworkInitialStateProps, 'infoNetwork'>) => void;      
}


export { type NetworkActionsProps, type NetworkInitialStateProps };

