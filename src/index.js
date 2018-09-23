import React from "react";
import ReactDOM from 'react-dom';
import App from './App/App';
import store from './../src/config/store';
import { Provider } from 'react-redux';

const Application = <Provider store={store} >
                        <App />
                    </Provider>

ReactDOM.render(
    Application,
    document.getElementById('rootContainer')
);
