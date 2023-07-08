import {  createStore } from 'redux';
import rootReducer from '../reducer/rootReducer';
// import storage from 'redux-persist/lib/storage'
// import {persistReducer} from 'redux-persist';



// const persitConfig={
//     key:"root",
//     version:1,
//     storage
// };

// const reducer = combineReducers({
//     rootReducer
// })

// const persistedReducer = persistReducer(persitConfig,reducer)

const store = createStore(rootReducer,
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    console.log("store",store)

export default store;