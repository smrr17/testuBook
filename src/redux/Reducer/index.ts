import UserReducer from './UserReducer';
import {combineReducers} from 'redux';

const AllReducers = combineReducers({
  UserReducer,
});

export default AllReducers;
