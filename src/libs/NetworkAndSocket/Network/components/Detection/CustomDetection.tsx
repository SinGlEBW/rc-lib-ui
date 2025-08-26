import { useCallback } from 'react';
import { networkActions } from '../../store/network.store';
import { InitialStatePropsNetwork } from '../../store/network.types';
import { Detection } from '../Detection/Detection';


export const CustomDetection = () => {
  const handleStatusInfoNetwork = useCallback((infoNetwork:InitialStatePropsNetwork['infoNetwork']) => {// console.log('handleStatusInfoNetwork', props);
    networkActions.setInfoNetworkStatus({infoNetwork}) ;
  }, []);

  return (
    <Detection getStatus={handleStatusInfoNetwork} />
  )
}


