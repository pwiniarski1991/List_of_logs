import react from 'react';
import styles from './App.css';
import Header from './Header/Header';
import MainView from './MainView/MainView';
import { connect } from 'react-redux';
import CssModules from 'react-css-modules';
import makeAction from '../config/reducerAction';
import types from './../reducers/types';

export class App extends react.Component {

    closeDropDown = () => {
        const { Dropdown } = this.props;
        let id = '';
        Object.entries(Dropdown).forEach(([key,val]) => {
            if(Dropdown[key]) {
                id = key;
            }
        });
        id && this.props.setDropDownOpened({id, opened: false});
    }

    render() {

        return (
            <div onClick={this.closeDropDown}>
                <Header 
                    title='List of logs' />
                <MainView />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        Dropdown: state.Dropdown
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDropDownOpened: (props) => dispatch(makeAction(types.SET_DROPDOWN_OPENED,props))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CssModules(App,styles));