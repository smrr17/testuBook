import {applyMiddleware, createStore} from 'redux';
import {thunk} from 'redux-thunk';
import AllReducers from './Reducer';

export const Store = createStore(AllReducers, applyMiddleware(thunk));
Store.subscribe(() => {});
