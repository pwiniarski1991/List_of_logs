import react from 'react';
import styles from './App.css';
import Header from './Header/Header';
import MainView from './MainView/MainView';
import CssModules from 'react-css-modules';

export class App extends react.Component {

    closeDropDown = () => {
        
    }

    render() {

        return (
            <div onClick={this.closeDropDown}>
                <Header title='List of logs' />
                <MainView />
            </div>
        );
    }

}

export default CssModules(App,styles);