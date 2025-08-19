import React from 'react'
import { networkActions } from './store/network.store';
import { InitialStateProps } from './store/network.types';
import { useCallback } from "react";
import { Detection } from './components/Detection/Detection';
import { Render } from './components/Render/Render';


const CustomDetection = () => {
  const handleStatusInfoNetwork = useCallback((infoNetwork:InitialStateProps['infoNetwork']) => {// console.log('handleStatusInfoNetwork', props);
    networkActions.setInfoNetworkStatus({infoNetwork}) ;
  }, []);

  return (
    <Detection getStatus={handleStatusInfoNetwork} />
  )
}

const Network = () => <></>;
Network.Render = Render;
Network.Detection = CustomDetection;
export { Network };
