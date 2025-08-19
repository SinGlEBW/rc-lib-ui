import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useNetworkSelector, networkSelectors} from '../../store/network.store';
import { InitialStateProps } from '../../store/network.types';




export interface DetectionProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  profile?: 'min-bottom';
  getStatus?: (props: InitialStateProps['infoNetwork']) => void;
  children?: React.ReactNode;
}


const DetectionMemo:FC<DetectionProps> = ({profile = 'min-bottom', getStatus, children}) => {

  const isNetworkStatus = useNetworkSelector(networkSelectors.getNetworkStatus);

  const colnfigRef = useRef({excludeFirstInit: false});
  /*############------------<{ Effects }>------------############ */
  
  useEffect(()=>{
    if((!isNetworkStatus && isNetworkStatus !== null)){ 
      const payload = {online: '', offline: 'active', status: isNetworkStatus, action: 'offline', titleOffline: `Нет доступа к сети`}
      resetClassActiveWithDuration('offline', payload);
      colnfigRef.current.excludeFirstInit = true;
      return;
    }
  
    if(colnfigRef.current.excludeFirstInit && isNetworkStatus !== null){   
      const payload = {online: 'active', offline: '', status: isNetworkStatus, action: 'online', titleOnline: 'В сети'};
      resetClassActiveWithDuration('online', payload);
      return;
    }
  }, [isNetworkStatus]);


  /*############------------<{ Helpers }>------------############ */

  const resetClassActiveWithDuration = useCallback((keyActive:string, payload) => {
    
    console.log('payload network: ',payload);
    // setStateHelpers(payload)
    typeof getStatus === 'function' && getStatus(payload);
    if((!isNetworkStatus && keyActive === 'offline')){
      return;
    }
    const idTimeout = setTimeout(()=> { console.dir('setTimeout OfflineDetection');
      const resetPayload = {[keyActive]: ''};
      (keyActive === 'online') && (resetPayload.action = '');
      
      // setStateHelpers(resetPayload)
      const payload:InitialStateProps['infoNetwork'] = { offline: '', online: '', status: isNetworkStatus, action: '', titleOnline: '', titleOffline: '' };
      typeof getStatus === 'function' && getStatus(payload);
      clearTimeout(idTimeout);
    }, 3000 );

  }, [isNetworkStatus]);

  return (<></>);
};

export const Detection = React.memo(DetectionMemo);
