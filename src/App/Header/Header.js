import React from 'react';
import Filter from './../../components/Filter/Filter';
import Dropdown from './../../components/Dropdown/Dropdown';
import api from './../../config/constants';
import { getLogs, sortItems } from './../../utils/Helpers';
import { connect } from 'react-redux';
import CssModules from 'react-css-modules';
import styles from './Header.css';
import makeAction from './../../config/reducerAction';
import types from './../../reducers/types';

export class Header extends React.Component {

    filterLogs = (filterInput, logs) => {
        const field = 'status';
        let filteredLogs = [];
        if(logs && filterInput) {
            logs.forEach(item => {
                if(item[field] === filterInput) {
                    filteredLogs.push(item);
                }
            });
        }
        return filterInput ? filteredLogs : logs;
    }
    
    setFilteredLogs = (filteredLogs,ev) => {
        const { isDesc } = this.props;
        this.props.setLogs(sortItems(filteredLogs,'date',isDesc));
        this.props.setFilterInput(ev.target.innerText);
    }
    
    handleChange = (ev) => {
        const isDesc = ev.target.innerText === 'desc' ? true : false
        const { logs } = this.props;
        const sortedLogs = logs.length ? sortItems(logs, 'date',isDesc) : [];
        this.props.setOrder(isDesc);
        this.props.setLogs(sortedLogs);
    }

    componentDidMount() {
        this.props.fetchLogs();
        // getLogs(api.url)
        // .then(data => {
        //     this.props.setInitialLogs(sortItems(data, 'date'));
        //     this.props.setLogs(sortItems(data, 'date'));
        // });
    }

    render() {

        const {title, initialLogs} = this.props;

        return (
            <React.Fragment>
                <h1>{title}</h1>
                <div styleName='headerPanel'>
                <Filter
                    customClass='right_space' 
                    initialItems={initialLogs}
                    filterFunction={this.filterLogs}
                    onFilter={this.setFilteredLogs}
                />
                <Dropdown
                    id='sort' 
                    placeHolder='sort Order' 
                    list={['desc', 'asc']} 
                    onChange={this.handleChange} 
                />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialLogs: sortItems(state.initialLogs, 'date',state.isDesc),
        logs: sortItems(state.logs, 'date',state.isDesc),
        isDesc: state.isDesc
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLogs: () => dispatch(makeAction(types.FETCH_LOGS)),
        //setInitialLogs: (logs) => dispatch(makeAction(types.SET_INITIAL_LOGS,logs)),
        //setLogs: (logs) => dispatch(makeAction(types.SET_LOGS,logs)),
        setOrder: (order) => dispatch(makeAction(types.SET_ORDER,order)),
        setFilterInput: (filter) => dispatch(makeAction(types.SET_FILTER_INPUT,filter))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CssModules(Header,styles));