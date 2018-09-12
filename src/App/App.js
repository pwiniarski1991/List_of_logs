import react from 'react';
import styles from "./App.css";
import Header from './../Header/Header';
import List from './../List/List';

export default class App extends react.Component {

    render() {
        return (
            <React.Fragment>
                <Header title='List of logs' />
                <List />
            </React.Fragment>
        );
    }

}