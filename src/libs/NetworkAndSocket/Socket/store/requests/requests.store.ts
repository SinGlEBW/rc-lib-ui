import { create } from 'zustand';
import { defaultInitialState, initialState, defaultFetching } from './requests.initial';
import {
  type RequestesFetchingStateWithKeyAction,
  type InitialStateProps,
  type RequestsActions,
} from './requests.types';

// ---------- Store ----------

export const requestsStore = create<InitialStateProps>(() => initialState);

// ---------- Actions ----------

export const requestsActions: RequestsActions = {
  resetFullState: () => requestsStore.setState(defaultInitialState, true),

  startRequest: ({ keyAction, statusGotData }) => {
    requestsStore.setState(state => ({
      activeRequests: {
        ...state.activeRequests,
        [keyAction]: {
          keyAction,
          statusGotData,
          isError: false,
          message: '',
          startAt: Date.now(),
          timeRequest: '',
          status: 'pending',
          isLoading: true,
          isSuccess: false,
        },
      },
    }));
  },

  finishRequest: ({ keyAction, ...other }) => {
    requestsStore.setState(state => {
      const prevRequest = state.activeRequests[keyAction];
      if (!prevRequest) return state;

      const duration = (Date.now() - prevRequest.startAt) / 1000;

      return {
        activeRequests: {
          ...state.activeRequests,
          [keyAction]: {
            ...prevRequest,
            startAt: prevRequest.startAt,
            status: other.isError ? 'rejected' : 'fulfilled',
            timeRequest: `${duration.toFixed(2)}s`,
            isLoading: false,
            ...other,
          },
        },
      };
    });
  },

  updateProgressRequest: ({ keyAction, ...other }) => {
    requestsStore.setState(state => ({
      activeRequests: {
        ...state.activeRequests,
        [keyAction]: {
          ...state.activeRequests[keyAction],
          ...other,
        },
      },
    }));
  },

  setReloadActions: (payload: { [key in string]?: boolean }) => {
    requestsStore.setState(state => ({
      reloadControl: { ...state.reloadControl, ...payload },
    }));
  },

  resetRequestByKey: ({ keyAction }) => {
    requestsStore.setState(state => ({
      activeRequests: {
        ...state.activeRequests,
        [keyAction]: defaultFetching,
      } as any,
    }));
  },
};

// ---------- Selectors ----------

export const requestsSelectors = {
  getFetchingInfo: (state: InitialStateProps, keyAction: string) =>
    state.activeRequests[keyAction] ?? defaultFetching,

  getReloadActions: (state: InitialStateProps, keyAction: string) =>
    !!state.reloadControl[keyAction],
};

// ---------- Hook-selector ----------

export const useRequestsSelector = <TSelected>(selector: (state: InitialStateProps) => TSelected): TSelected => requestsStore(selector);