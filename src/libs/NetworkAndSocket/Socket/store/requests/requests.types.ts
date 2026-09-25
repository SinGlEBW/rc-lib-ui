interface RequestesFetchingState {
  status: 'no-request' | 'fulfilled' | 'pending' | 'rejected';
  startAt: number;
  timeRequest: string;
  isError: boolean;
  message: any;
  isLoading: boolean;
  isSuccess: boolean;
  statusGotData: 'server' | 'db' | "none"
}

interface RequestesFetchingStateWithKeyAction extends RequestesFetchingState{
  keyAction: string
}

type InitialStateProps = {
  activeRequests: Record<string, RequestesFetchingStateWithKeyAction>;
  reloadControl: { [key in string]?: boolean };
};

type RequestsActions = {
  resetFullState: () => void;
  startRequest: (p: Pick<RequestesFetchingStateWithKeyAction, 'keyAction' | 'statusGotData'>) => void;
  finishRequest: (
    p: Omit<RequestesFetchingStateWithKeyAction, 'status' | 'timeRequest' | 'startAt' | 'isLoading'>
  ) => void;
  updateProgressRequest: (
    p: Omit<RequestesFetchingStateWithKeyAction, 'status' | 'timeRequest' | 'startAt' | 'isLoading'>
  ) => void;
  setReloadActions: (p: { [key in string]?: boolean }) => void;
  resetRequestByKey: (p: { keyAction: string }) => void;
};

export type {
  InitialStateProps,
  RequestsActions,
  RequestesFetchingState,
  RequestesFetchingStateWithKeyAction
};