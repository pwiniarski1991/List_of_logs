import react from 'react';
import styles from './App.css';
import Header from './Header/Header';
import MainView from './MainView/MainView';
import CssModules from 'react-css-modules';

export class App extends react.Component {

    render() {

        return (
            <React.Fragment>
                <Header title='List of logs' />
                <MainView />
            </React.Fragment>
        );
    }

}

export default CssModules(App,styles);