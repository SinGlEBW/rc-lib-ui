import type { InitialStatePropsDeleting } from './deleting.types';

const initialState:InitialStatePropsDeleting = {}

const defaultInitialState: typeof initialState = JSON.parse(JSON.stringify(initialState));

export { defaultInitialState, initialState };

