
import { NetworkStatusTracker } from '../NetworkStatusTracker/NetworkStatusTracker';
import type { OnStatusChange } from '../NetworkStatusTracker/NetworkStatusTracker.types';
import type { NetworkControlsConfigProps, NetworkControlsStateProps, NetworkInfo, NetworkMonitorCallback, NetworkMonitorCallbackInterval } from './NetworkControls.types';



export class NetworkControls {

  private networkTicker:NetworkStatusTracker | null = null
  private state: NetworkControlsStateProps = {
    isActiveDelay: false,
    isNetwork: false,
    typeNetwork: '',
  }

  private config: NetworkControlsConfigProps = {
    interval: 3000,
    isAutoStop: false
  }


  private setState(payload: Partial<typeof this.state>){this.state = {...this.state, ...payload}}
  getState(){ return this.state }

 
  private saveCallback = {
    stopDelay: () => {}
  }

  constructor(listUrlsCheckConnection:string[]){
    this.networkTicker = new NetworkStatusTracker(listUrlsCheckConnection);
  } 

  getNetworkStatus (onStatusChange?: OnStatusChange) {
    (this.networkTicker as NetworkStatusTracker)?.checkStatus(onStatusChange);  
  }
  
  async motitorNetwirk(
    cbInterval:NetworkMonitorCallbackInterval, 
    cb:NetworkMonitorCallback, 
    options:NetworkControlsConfigProps = {}
  ){
    const { interval, isAutoStop } = {...this.config, ...options} as Required<NetworkControlsConfigProps>;
    
    const { isActiveDelay } = this.getState();
    if(!isActiveDelay){
      this.setState({isActiveDelay: true});
     
      const sendNetworkInfo = (networkInfo: NetworkInfo) => {
        this.setState(networkInfo);
        cb(networkInfo)
      }

      const networkTicker = this.networkTicker as Required<NetworkStatusTracker>;
      
      const currentNetworkInfo = await networkTicker?.checkStatus();
      
      if(currentNetworkInfo?.isNetwork){
        this.setState({isActiveDelay: false});
        sendNetworkInfo(currentNetworkInfo);
      }else{
   
        const { stop } = networkTicker?.fetchingNetwork((info) => {
          
          cbInterval({
            reset: () => {
              stop();
              this.setState({isActiveDelay: false});
            },
            sendNetworkInfo
          })
          const { isNetwork } = this.getState();
          if(isNetwork !== info.isNetwork){
       
            sendNetworkInfo(info);
            if(info.isNetwork && isAutoStop){
              stop();
              this.setState({isActiveDelay: false});
            }
          }

        }, {interval});
      
        this.saveCallback.stopDelay = stop;
      }
    }
  }

  stopMotitorNetwirk(){
    const { isActiveDelay } = this.getState();
    if(isActiveDelay){
      this.setState({isActiveDelay: false});
      this.saveCallback.stopDelay()
    }
  }
}

