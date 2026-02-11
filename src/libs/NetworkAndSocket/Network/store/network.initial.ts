
import { type NetworkInitialStateProps } from "./network.types";

const initialState:NetworkInitialStateProps = {
  isNetwork: null as null | boolean,
  typeNetwork: '',
  infoNetwork: {
    online: '',
    offline: '',
    action: '',
    status: null as null | boolean,
    titleOnline: '',
    titleOffline: ''
  },
}

const defaultInitialState:typeof initialState = JSON.parse(JSON.stringify(initialState));

export {
    defaultInitialState,
    initialState
};

