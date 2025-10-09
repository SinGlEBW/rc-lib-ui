import { BasePayloadSocket } from './../../SocketApi.types';
import { SocketApi } from '../../SocketApi';
import type { CreateRequestSocketProps } from './createRequestSocket.types';





export const createRequestSocket = <RequestSocket, ResponseSocket extends BasePayloadSocket & {[key in string]: any}>(
  cb: (data: ResponseSocket) => void, 
  { payload, signal }:CreateRequestSocketProps<RequestSocket>
) => {


    let isCompleted = false;


    const messageHandler = (res: any) => {
      if ( res.action === payload.action) {
        complete(res, false);
      }
    };


    const complete = (result: any, isError: boolean = false) => {
      if (isCompleted) return;
      isCompleted = true;
      SocketApi.off('msg', messageHandler);
      // isError ? reject(result) : resolve(result);
    };

  
    // Обработчик отмены
    if (signal) {
      signal.addEventListener('abort', () => {
        complete(new DOMException('Request aborted', 'AbortError'), true);
      });
    }
  

 
    SocketApi.on('msg', messageHandler);

    try {
      SocketApi.send(payload);
    } catch (error) {
      complete(error, true);
    }

}

