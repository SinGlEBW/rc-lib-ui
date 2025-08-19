import { create } from 'zustand';
import { initialState, defaultInitialState } from './network.initial';
import { InitialStateProps, type NetworkActions } from './network.types';


export const storeNetwork = create<InitialStateProps>(() => (initialState));

export const networkActions:NetworkActions = {
  resetState: () => storeNetwork.setState(defaultInitialState),
  setTypeNetwork: ({typeNetwork}) => storeNetwork.setState({typeNetwork}),
  setNetworkStatus: ({isNetwork}) => storeNetwork.setState({isNetwork}),
  setInfoNetworkStatus: ({infoNetwork}) => storeNetwork.setState({infoNetwork}),  
};

export const networkSelectors = {
  getNetworkStatus: (state:InitialStateProps) => state.isNetwork,
  getTypeNetwork: (state:InitialStateProps) => state.typeNetwork,
  getInfoNetworkStatus: (state:InitialStateProps) => state.infoNetwork,
};



export const useNetworkSelector = <TSelected>(selector: (state: InitialStateProps) => TSelected ): TSelected => storeNetwork(selector);