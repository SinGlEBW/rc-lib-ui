import { create } from 'zustand';
import { defaultInitialState, initialState } from './network.initial';
import { NetworkInitialStateProps, type NetworkActionsProps } from './network.types';


export const storeNetwork = create<NetworkInitialStateProps>(() => (initialState));

export const networkActions:NetworkActionsProps = {
  resetState: () => storeNetwork.setState(defaultInitialState),
  setTypeNetwork: ({typeNetwork}) => storeNetwork.setState({typeNetwork}),
  setNetworkStatus: ({isNetwork}) => storeNetwork.setState({isNetwork}),
  setInfoNetworkStatus: ({infoNetwork}) => storeNetwork.setState({infoNetwork}),  
};

export const networkSelectors = {
  getNetworkStatus: (state:NetworkInitialStateProps) => state.isNetwork,
  getTypeNetwork: (state:NetworkInitialStateProps) => state.typeNetwork,
  getInfoNetworkStatus: (state:NetworkInitialStateProps) => state.infoNetwork,
};



export const useNetworkSelector = <TSelected>(selector: (state: NetworkInitialStateProps) => TSelected ): TSelected => storeNetwork(selector);