import { combineReducers } from 'redux';

import { authReducer } from './reducers/auth';

export const rootReducer = combineReducers({
    auth: authReducer
});
