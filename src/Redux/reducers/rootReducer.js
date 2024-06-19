// reducers/index.js
import { combineReducers } from 'redux';
import { userReducer } from './userSlice';
import { volumeReducer } from './volumeSlice';
import { revenueReducer } from './revenueSlice';
import { quarterReducer } from './quarterSlice';
import { monthlyReducer } from './monthlyTransactionSlice';
import { contactReducer } from './contactSlice';

const rootReducer = combineReducers({
      user: userReducer,
      volume: volumeReducer,
      revenue: revenueReducer,
      quarter:quarterReducer,
      monthly: monthlyReducer,
      contact: contactReducer,
});

export default rootReducer;
