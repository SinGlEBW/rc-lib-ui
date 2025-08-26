import { SocketApi } from '../../SocketApi';
import type { CreateRequestSocketProps } from './createRequestSocket.types';




export const createRequestSocket = <ResponseSocket = any>(
  cb: (data: ResponseSocket) => void, 
  { payload, socketAction, signal }:CreateRequestSocketProps
) => {

  const saveRequestId = Math.random().toString(36).slice(2, 9);

    let isCompleted = false;



    const messageHandler = (res: any) => {
      const requestId = res?.request?.requestId
      if (saveRequestId === requestId && res.action === socketAction) {
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
      SocketApi.send({...payload, action: socketAction, requestId: saveRequestId}, );
    } catch (error) {
      complete(error, true);
    }

}

