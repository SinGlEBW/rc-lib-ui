import { type InitialStateProps, type RequestesFetchingState } from './requests.types';

export const initialState:InitialStateProps = {
  activeRequests: {},
  reloadControl: {}
};

export const defaultFetching:RequestesFetchingState = {
    isError: false,
    message: '',
    startAt:  0,
    timeRequest: '',
    status: 'no-request',
    isLoading: false,
    isSuccess: false,
    statusGotData: 'none',
}

export const defaultInitialState:typeof initialState = JSON.parse(JSON.stringify(initialState)); 

