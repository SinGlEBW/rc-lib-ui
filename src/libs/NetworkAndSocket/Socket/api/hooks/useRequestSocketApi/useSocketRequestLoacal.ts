import React, { useEffect, useMemo, useState } from 'react';
import { requestsActions, requestsSelectors, useRequestsSelector } from '@libs/NetworkAndSocket/Socket/store/requests';
import { socketSelectors, useSocketSelector } from '@libs/NetworkAndSocket/Socket/store/socket/socket.store';

interface BaseI<K, RT> {
  keyAction: K;
  requestThunk: RT;
  skip?: boolean;
  isReceivedNoRequesting?: boolean;
  defaultValue?: any;
}

type AsyncThunkAction<T> = (...args: any[]) => Promise<T> | T;
type UnwrapThunkResult<T> = T extends Promise<infer U> ? U : T;
type SelectorData<T> = T extends AsyncThunkAction<infer U> ? UnwrapThunkResult<U> : T;


//TODO: Пока что не обращаеться к db
interface UseSocketRequestLocalProps<RT, K extends string, S = void> extends BaseI<K, RT> {}
export const useSocketRequestLoacal = <RT extends (payload?: any) => any, K extends string = string>({
  keyAction,
  requestThunk,
  defaultValue = null,
  skip = false,
  isReceivedNoRequesting = false,
}: UseSocketRequestLocalProps<RT, K>) => {
  const [data, setState] = useState<SelectorData<ReturnType<typeof requestThunk>>>(defaultValue);
  const info = useRequestsSelector(state => requestsSelectors.getFetchingInfo(state, keyAction));
  const isReadySocket = useSocketSelector(socketSelectors.getStatusReady);

  const isData = useMemo(() => {
    if (!data) return false;
    if (Array.isArray(data)) return data.length > 0;
    if (typeof data === 'object') return Object.keys(data).length > 0;
    return false;
  }, [data]);

  //Сбос запроса
  useEffect(() => {
    if (!isReadySocket && info.status === 'pending') {
        requestsActions.finishRequest({
          keyAction,
          isError: true,
          isSuccess: false,
          message: 'Потеряно соединение с сервером',
          statusGotData: 'none',
        })
    }
  }, [isReadySocket, info]);

  const shouldRequest = useMemo(() => {
    if (skip) return false;
    if (!isReadySocket) return false;
    if (info.isLoading) return false;
    if (isReceivedNoRequesting && isData) return false;
    return true;
  }, [skip, isReadySocket, info.isLoading, isReceivedNoRequesting, isData]);

  useEffect(() => { shouldRequest && request(); }, [shouldRequest]);

  /*############--------------<{ Helpers }>--------------###########*/
  /*-----------------------------------------------------------------*/
  const request = async (payload?: Parameters<typeof requestThunk>[0]) => {
    data != defaultValue && setState(() => defaultValue);
    const result = await requestThunk(payload);
    setState(() => result);
    return result;
  };

  const resetState = () => {
    setState(defaultValue);
  };
  const setReloadActions = (param: { [key in K]: boolean }) => {
    requestsActions.setReloadActions(param);
  }

  /*-----------------------------------------------------------------*/
  /*-----------------------------------------------------------------*/

  return { request, resetState, setReloadActions, data, isData, ...info };
};
