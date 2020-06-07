import { combineReducers } from 'redux';
import cityReducer from './cityReducer'
import productReducer from './productReducer'
import userReducer from './userReducer'
import orderReducer from './orderReducer'
// import SystemReducer from './SystemReducer';
const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  city: cityReducer,
  order: orderReducer
})
export default rootReducer;