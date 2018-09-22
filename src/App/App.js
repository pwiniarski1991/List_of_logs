import react from 'react';
import styles from './App.css';
import Header from './Header/Header';
import MainView from './MainView/MainView';
import CssModules from 'react-css-modules';
import { Provider } from 'react-redux';
import store from './../config/store';

export class App extends react.Component {

    render() {

        return (
            <React.Fragment>
                <Header title='List of logs' />
                <Provider store={store} >
                    <MainView />
                </Provider>
            </React.Fragment>
        );
    }

}

export default CssModules(App,styles);