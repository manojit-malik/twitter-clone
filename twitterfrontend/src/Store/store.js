import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { authReducer } from './Auth/Reducer';
import { thunk }  from "redux-thunk";
import { tweetReducer } from './Tweet/Reducer';

const rootReducers  = combineReducers({
    
    auth:authReducer,
    tweet:tweetReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
