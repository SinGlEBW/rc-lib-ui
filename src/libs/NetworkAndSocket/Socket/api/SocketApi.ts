import uuid4 from "uuid4";
import { DelaysPromise } from "./deps/DelaysPromise";
import { EventSubscribers } from "./deps/EventSubscribers/EventSubscribers";
import { NetworkInfo } from './deps/NetworkControls';
import { NetworkStatusTracker } from './deps/NetworkStatusTracker/NetworkStatusTracker';
import { WsApi, WsApi_Options_P } from "./deps/WsApi";
import type { WsApi_Events } from './deps/WsApi/WsApi.types';
import type { SocketApi_Options_P, SocketApi_StateProps_P, SocketApiOptionsRequest, SocketResponse } from "./SocketApi.types";
/*
  TODO: Передавать опции
  SocketApi.init({
    isReconnect: true//Если появиться интернет
  })
*/


// class NetworkPC  {
//   getControls:INetworkItemControls['getControls'] = () => ({
//     keyNameSystem: 'pc', 
//     getInfo: () => {
//       const isNetwork = typeof navigator !== 'undefined' ? navigator.onLine : true;
//       const effectiveType = (navigator as any)?.connection?.effectiveType;
//       const typeNetwork = isNetwork ? effectiveType ? effectiveType : "4g"  : "none";
//       return { isNetwork, typeNetwork }
//     },
//     getinfoPromise: () => new Promise((resolve) => {
//       // networkControl.checkStatus( () => {}, {})
//       // const { stop } = networkControl.monitorNetwork(
//       //   (state) => { 
//       //     if(isNetwork !== state.isOnline){
        
//       //       resolve({ isNetwork, typeNetwork })
//       //     }
//       //   },
//       //   { interval: 3000 }
//       // );


//     })
//   });
// }


// class NetworkCordova {
//   private getIsNetwork = (status:string) => !["none", "unknown", undefined].includes(status);
//   getControls:INetworkItemControls['getControls'] = () => ({
//     keyNameSystem: 'cordova', 
//     getInfo: () => {
//        const effectiveType = (navigator as any)?.connection?.type;
//        const isNetwork = this.getIsNetwork(effectiveType);
//        const typeNetwork = effectiveType ? effectiveType  : "none";
//       return { isNetwork, typeNetwork }
//     }
//   })
// }






interface SocketApi_Events {
  timeOffReConnect(info: { status: boolean; msg: string }): void;
  reConnect(status: boolean): void;
  network(info: NetworkInfo): void;
}

type CommonEvents = SocketApi_Events & WsApi_Events;

export class SocketApi {
  private static state: SocketApi_StateProps_P = {
    isDisconnect: true,
    isActiveReConnect: false,
    isOfflineSocket: true,
    isReady: false,
    isGotWasFirstConnection: false,
    isStartCheckNetwork: false
  };
  private static options: SocketApi_Options_P = {
    isReConnectNetworkOnline: false,
    listUrlsCheckConnectNetwork: ['https://jsonplaceholder.typicode.com/posts/1']
  };
  
  private static wsApi = new WsApi();
  private static delay = new DelaysPromise();

  // private static internetControl:NetworkControls | null = null
  private static networkTicker:NetworkStatusTracker | null = null;
  private static events = new EventSubscribers<SocketApi_Events>(["timeOffReConnect", "reConnect", "network"]);
  private static saveID: Partial<Record<"idReConnect" | "checkConnect", number | null>> = {
    idReConnect: null,
    checkConnect: null,
  };
  private static stateDefault = SocketApi.copyState(SocketApi.state);

  private static copyState(state) {
    return JSON.parse(JSON.stringify(state));
  }
  private static setState(state: Partial<typeof SocketApi.state>) {
    SocketApi.state = { ...SocketApi.state, ...state };
  }
  private static resetState() {
    SocketApi.state = SocketApi.copyState(SocketApi.stateDefault);
  }
  private static setOptions(options: Partial<SocketApi_Options_P>) {
    SocketApi.options = { ...SocketApi.options, ...options };
  }

  private static setStatusReConnect(status: boolean) {
    SocketApi.setState({ isActiveReConnect: status });
    SocketApi.events.publish("reConnect", status);
  }
  private static setInfoConnect = (info) => {
    if (!info.status) {
      SocketApi.close();
    }
    SocketApi.setState({ isOfflineSocket: !info.status });
    SocketApi.events.publish("timeOffReConnect", info);
    SocketApi.setStatusReConnect(false);

  };
  private static online = () => {
    
    // SocketApi.setState({ isNetworkStatus: true });

    if (!SocketApi.state.isActiveReConnect && SocketApi.options.isReConnectNetworkOnline
       /*#################-----------<{ Убрал 21.08.2025 }>------------############# */
      && SocketApi.state.isGotWasFirstConnection
       /*-----------------------------------------------------------------------------------------*/
    ) {
      SocketApi.socketReConnect();
    }
  };
  private static offline = () => {
    //SocketApi.config.isReConnect
    // SocketApi.setState({ isNetworkStatus: false });

    if (SocketApi.state.isActiveReConnect) {
      SocketApi.stopReConnect(false);
    }
  };

  private static splitOptions = (options: WsApi_Options_P & SocketApi_Options_P) => {
    return Object.entries(options).reduce(
      (acc, [key, value]) => {
        const currentWsOptions = SocketApi.wsApi.getOptions();
        if (key in currentWsOptions) {
          return { ...acc, WsOptions: { ...acc.WsOptions, [key]: value } };
        }
        return { ...acc, SocketApiOptions: { ...acc.SocketApiOptions, [key]: value } };
      },
      { WsOptions: {}, SocketApiOptions: {} } as { WsOptions: WsApi_Options_P; SocketApiOptions: SocketApi_Options_P }
    );
  };
  /*---------------------------------------------------------------------------------------------------------------------------*/
  static getState = () => SocketApi.state;

  static on: <K extends keyof CommonEvents>(name: K, cb: CommonEvents[K]) => void  = (name, listener) => {
    const wsApi_RegisteredEvents = SocketApi.wsApi.events.getListNameEvents();
    if (!wsApi_RegisteredEvents.includes(name)) {
      SocketApi.events.subscribe(name as any, listener) ;
    } else {
      SocketApi.wsApi.events.subscribe(name as any, listener);
    }
  };

  static off: typeof SocketApi.wsApi.events.subscribe & typeof SocketApi.events.subscribe = (name, listener) => {
    const wsApi_RegisteredEvents = SocketApi.wsApi.events.getListNameEvents();
    if (!wsApi_RegisteredEvents.includes(name)) {
      SocketApi.events.unsubscribe(name, listener);
    } else {
      SocketApi.wsApi.events.unsubscribe(name, listener);
    }
  };
  static getRequestSave = SocketApi.wsApi.getRequestSave;
  static getStatusSocket = SocketApi.wsApi.getStatusSocket;
  static close = () => {
    if (SocketApi.state.isActiveReConnect) {
      SocketApi.stopReConnect(false);
    } else {
      SocketApi.wsApi.close();
    }
  };

  //INFO: Проверить как часто вызываеться
  private static setNetworkStatus = (info:NetworkInfo) => {
    SocketApi.events.publish("network", info)
    
    info.isNetwork ? SocketApi.online() : SocketApi.offline();
  }
  static init = (options: WsApi_Options_P & SocketApi_Options_P) => {

    const { WsOptions, SocketApiOptions } = SocketApi.splitOptions(options);
    // SocketApi.internetControl = new NetworkControls(SocketApiOptions.listUrlsCheckConnectNetwork ?? []);
    //TODO: Возможно пересмотреть подход 
    //INFO: Убрал для проверки internetControlDelay
    /*#################-----------<{ Убрал 21.08.2025 }>------------############# */
     // SocketApi.internet.watch((isNetwork, textStatus) => {
      //   // 
      //   SocketApi.setNetworkStatus({ isNetwork, typeNetwork: textStatus });
      // });

      this.networkTicker = new NetworkStatusTracker(SocketApiOptions.listUrlsCheckConnectNetwork ?? []);
      this.networkTicker.startEvents((info) => {
        SocketApi.setNetworkStatus(info);
      });
      // this.networkTicker.fetchingNetwork
      //INFO: Через networkTicker можно реализовать отслеживание интернета через запросы на сервера
    /*-----------------------------------------------------------------------------------------*/
    

    


    
    SocketApi.setOptions(SocketApiOptions);
    SocketApi.wsApi.init(WsOptions);
  };
  
  static async connect() {  
    if (!SocketApi.wsApi.getIsInitWS()) { return }
      //INFO: Добавлено вместо internet
      // const infoNetwork = SocketApi.internetControlDelay.getNetworkInfo();
      // SocketApi.setNetworkStatus(infoNetwork)
      
      /*#################-----------<{ Добавил 21.08.2025 }>------------############# */
      // const { isStartCheckNetwork, isActiveReConnect, isGotWasFirstConnection } = SocketApi.getState();
      // if(!isGotWasFirstConnection){
      //   debugger
      //   (SocketApi.internetControl as NetworkControls)?.getNetworkStatus((info) => {
      //     debugger
      //     SocketApi.setNetworkStatus(info);
      //     SocketApi.setState({ isGotWasFirstConnection: true });//Важно её положение
      //   })

      // }
      // debugger
      // if(isActiveReConnect && !isStartCheckNetwork){
      //   SocketApi.setState({ isStartCheckNetwork: true })
      //       debugger

      //   const activeInterval:NetworkMonitorCallbackInterval = ({reset, sendNetworkInfo}) => {
      //     //INFO: На случай если переданные listUrlsCheckConnectNetwork не отвечают или cors, но сокет есть
      //     //Можно отключить по каким либо условиям сокета
      //     //TODO: Если отобразил модалку 

      //     //TODO: Не забыть сделать isStartCheckNetwork = false

      //     debugger
      //     const { isOfflineSocket, isActiveReConnect } = SocketApi.getState();
      //     if(SocketApi.getStatusSocket() === 'ready'){
      //       reset();
      //       sendNetworkInfo({isNetwork: true, typeNetwork: '4g'});
      //     }

      //     if(isOfflineSocket && !isActiveReConnect){
      //       reset();
      //     }
      //   }

      //   const watchInternetStatus:NetworkMonitorCallback = (info) => {
      //     SocketApi.setNetworkStatus(info);
      //     if(!SocketApi.state.isGotWasFirstConnection){
      //       SocketApi.setState({ isGotWasFirstConnection: true })
      //     }
      //   }

        
      //    SocketApi.internetControl?.motitorNetwirk(activeInterval, watchInternetStatus, { interval: 1000, isAutoStop: true })
      // }
     
    
      
      /*-----------------------------------------------------------------------------------------*/
    console.log("CONNECT WS");
    SocketApi.setState({ isDisconnect: false });
    SocketApi.wsApi.connect();
    
  }

  static disconnect() {
    if (!SocketApi.state.isDisconnect) {
      SocketApi.setState({ isDisconnect: true });
      console.log("DISCONNECT WS");
      SocketApi.wsApi.disconnect();
      SocketApi.resetState();
      SocketApi.events.resetSubscribers();
   
    }
  }

  static send<P = any, Data = any>(payload: P, cb?: (data: Data) => void) {
    const { action, ...other } = payload as any;
    
    const reqId = uuid4();
    const requestTime = Date.now();
  
    SocketApi.wsApi.setRequestSave({
      requestAction: action,
      reqId,
      requestTime,
      payload: { action, ...other },
      cb,
    });
    const ws = SocketApi.wsApi.getSocket();
    /*FIXME: Нужно слать id запроса, после ответ искать по id, потому что может быть запрошено несколько */
    if (!ws || ws.readyState !== 1) {
      console.log("Нет подключения к сокету");
      return;
    }
    
    SocketApi.wsApi.send(payload);
  }


  


  static stopReConnect(status?: boolean) {
    console.dir("функция stop не присвоена к stopReConnect");
  }

  static #getTimeRequest() {
    //TODO: придумать как получить время запроса. Нужно ориентироваться на action ответа что бы понимать ответ данного сообщения
  }

  /*------------------------------------------------------------------------------------------------------*/

  static socketReConnect = () => {
    if (!SocketApi.wsApi.getIsInitWS()) {
      return;
    }
    
    console.log("reconnect");
    if (!SocketApi.saveID.idReConnect) {
      SocketApi.setStatusReConnect(true);

      SocketApi.connect();
      const { timeReConnect, numberOfRepit } = SocketApi.wsApi.getOptions();
      const delayControlActionEvery = SocketApi.delay.startActionEvery(
        () => {
          console.log("reconnect:>>delay");
          if (SocketApi.wsApi.getStatusSocket() === "ready") {
            console.dir("Подключение установлено");
            return true;
          }
          SocketApi.connect();

          return false;
        },
        {
          interval: timeReConnect,
          countAction: numberOfRepit,
          watchIdInterval: (id) => {
            SocketApi.saveID.idReConnect = id;
          },
          controlAction: ({ stop, getIsActiveEvent }) => {
            SocketApi.stopReConnect = stop;
          },
        }
      );

      delayControlActionEvery.promise
      .then((info) => {
        // SocketApi.internetControlDelay.motitorNetwirk(() => {})
        
        SocketApi.setInfoConnect(info)
      })
      .catch((info) => {
        //INFO: Проверить работу




        SocketApi.setInfoConnect(info)
      });
      
    } else {
      console.groupCollapsed("Процесс socketReConnect уже запущен");
      console.log("SocketApi.saveID: ", SocketApi.saveID);
      console.groupEnd();
    }
  }



  static async request<P = any, Data = any>(
    keyRequest: string,
    payload: P, 
    options: SocketApiOptionsRequest = {} 
  ): Promise<Data> {
    return new Promise((resolve, reject) => {
      if (options?.signal?.aborted) {
        reject(new DOMException('Aborted', 'AbortError'));
        return;
      }

      const reqId = uuid4();
      const requestTime = Date.now();
    
      SocketApi.wsApi.setRequestSave({
        requestAction: keyRequest,
        reqId,
        requestTime,
        payload: payload as any,
        cb: undefined,
      });

       
        
      // Таймаут
      let timeoutId:NodeJS.Timeout;
      if(options?.timeout) {

        timeoutId = setTimeout(() => {
          SocketApi.off('msg', handleResponse);
          SocketApi.off('error', handleError);
          reject(new Error('Request timeout'));
        }, options?.timeout);
      }
        
      // Обработчик ошибок
      const handleError = (error:any) => {
        SocketApi.off('msg', handleResponse);
        SocketApi.off('error',handleError);
        reject(error);
      };

          
      const handleResponse = (res: SocketResponse<P, Data>) => {
        const reqItem = this.wsApi.findDataRequestByAction(keyRequest);
      
        if (res?.request?.requestAction !== reqItem.requestAction) return;
        
        // Отписываемся от обработчиков
        SocketApi.off('msg', handleResponse);
        SocketApi.off('error', handleError);
        resolve({...res});
      };


      SocketApi.on('msg', handleResponse);
      SocketApi.on('error', handleError);

      // Отмена по AbortSignal
      options?.signal?.addEventListener('abort', () => {
        debugger
        timeoutId && clearTimeout(timeoutId);
        SocketApi.off('msg', handleResponse);
        SocketApi.off('error', handleError);
        reject(new DOMException('Aborted', 'AbortError'));
      });



      const ws = SocketApi.wsApi.getSocket();
      if (!ws || ws.readyState !== 1) {
        console.log("Нет подключения к сокету");
        return;
      }
      
      SocketApi.wsApi.send(payload);

    });
  }
}

// const idInterval = setInterval(() => {
//   const isActive = getIsActiveEvent()
//   if(!SocketApi.wsApi.internet.isOnline){
//     clearInterval(idInterval);
//     stop();
//     return;
//   }
//   if (SocketApi.wsApi.state.statusConnect === "ready") {
//     clearInterval(idInterval);
//     stop();
//   }else if(!isActive){
//     clearInterval(idInterval);
//   }

// }, SocketApi.intervalCheckConnectSocket);
