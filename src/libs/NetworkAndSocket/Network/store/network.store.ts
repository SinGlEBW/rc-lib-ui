import { create } from 'zustand';
import { defaultInitialState, initialState } from './network.initial';
import { InitialStatePropsNetwork, type NetworkActions } from './network.types';


export const storeNetwork = create<InitialStatePropsNetwork>(() => (initialState));

export const networkActions:NetworkActions = {
  resetState: () => storeNetwork.setState(defaultInitialState),
  setTypeNetwork: ({typeNetwork}) => storeNetwork.setState({typeNetwork}),
  setNetworkStatus: ({isNetwork}) => storeNetwork.setState({isNetwork}),
  setInfoNetworkStatus: ({infoNetwork}) => storeNetwork.setState({infoNetwork}),  
};

export const networkSelectors = {
  getNetworkStatus: (state:InitialStatePropsNetwork) => state.isNetwork,
  getTypeNetwork: (state:InitialStatePropsNetwork) => state.typeNetwork,
  getInfoNetworkStatus: (state:InitialStatePropsNetwork) => state.infoNetwork,
};



export const useNetworkSelector = <TSelected>(selector: (state: InitialStatePropsNetwork) => TSelected ): TSelected => storeNetwork(selector);