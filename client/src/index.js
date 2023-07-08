import React from "react";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import store from './redux/store/store';
import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
// import {persistStore} from 'redux-persist'
const root = document.getElementById('root');


// let persistor = persistStore(store)
ReactDOM.render(
    <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <App/>
    {/* </PersistGate> */}
    </Provider>,root
)