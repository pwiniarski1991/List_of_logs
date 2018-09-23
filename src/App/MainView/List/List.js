import React from 'react';
import ListItem from './ListItem/ListItem';
import styles from './List.css';
import CssModules from 'react-css-modules';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { sortItems } from './../../../utils/Helpers';

export class List extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {logs, filterInput} = this.props;

        if(!logs.length) {
            return(
                <Loader type="TailSpin" color="green" height={80} width={80} />
            )
        } 
        if(filterInput) {
            logs = logs.filter(log => log.status === filterInput);
        }
        return (
            <ul styleName='logsList'>
                {logs.map((log,i) => {
                    if(i<15) {
                        return (<ListItem key={log.title+log.date+i} 
                                          status={log.status}
                                          title={log.title}
                                          description={log.details}
                                          date={log.date} 
                                />);
                    }
                })}
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        logs: sortItems(state.logs, 'date',state.isDesc),
        isDesc: state.isDesc,
        filterInput: state.filterInput
    }
};

export default connect(mapStateToProps,null)(CssModules(List, styles));