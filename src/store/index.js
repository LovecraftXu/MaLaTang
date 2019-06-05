import {combineReducers, createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import roleReducer from './roleReducer';
import userReducer from './userReducer';
import logReducer from './logReducer';
import customerReducer from './customerReducer';
import seatReducer from './seatReducer';
import menuReducer from './menuReducer';
import orderReducer from './orderReducer';
import shopcartReducer  from './shopcartReducer';



// 合并Reducer
let rootReducer = combineReducers({
	roleState:roleReducer,
	userState:userReducer,
	logState:logReducer,
	customerState:customerReducer,
	seatState:seatReducer,
	menuState:menuReducer,
	orderState:orderReducer,
	shopcartState:shopcartReducer,
})
//创建仓库
export default createStore(rootReducer,applyMiddleware(thunk));