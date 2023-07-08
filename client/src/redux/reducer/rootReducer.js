import { combineReducers } from 'redux';
import itemReducer from './reducer';
import itemCart from './cartReducer';

const rootReducer = combineReducers({
    itemData : itemReducer,
    cartData : itemCart
});

export default rootReducer