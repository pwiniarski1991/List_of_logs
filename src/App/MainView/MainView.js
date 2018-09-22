import react from 'react';
import styles from './MainView.css';
import List from './List/List';
import Filter from './../../components/Filter/Filter';
import { getLogs, sortItems } from './../../utils/Helpers';
import { api } from './../../config/constants';
import CssModules from 'react-css-modules';
import Modal from './../../components/Modal/Modal';
import Form from './../../components/Form/Form';
import { connect } from 'react-redux';
import showResults from './../../utils/FormHelper';
import types from './../../reducers/types';
import makeAction from './../../config/reducerAction';

export class MainView extends react.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalShown: false
        };

        this.setFilteredLogs = this.setFilteredLogs.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        getLogs(api.url)
        .then(data => {
            this.props.setInitialLogs(sortItems(data, 'date'));
            this.props.setLogs(sortItems(data, 'date'));
        });
    }

    filterLogs(filterInput, logs) {
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

    setFilteredLogs(filteredLogs) {
        const {isDesc} = this.props;
        this.props.setLogs(sortItems(filteredLogs,'date',isDesc));
    }

    handleChange(event) {
        const { logs, isDesc} = this.props;
        const sortedLogs = logs.length ? sortItems(logs, 'date',!isDesc) : [];
        this.props.setOrder(!isDesc);
        this.props.setLogs(sortedLogs);
    }

    addLog = (log) => {
        this.props.addLog(log);
        this.closeModal();
        showResults(log);
    }

    openModal() {
        this.setState({
            isModalShown: true
        });
    }

    closeModal() {
        this.setState({
            isModalShown: false
        });
    }

    render() {
        const { isModalShown } = this.state;
        const { initialLogs, logs, isDesc } = this.props;

        const sortOrder = isDesc ? 'desc' : 'asc';

        return (
            <React.Fragment >
                <button onClick={this.openModal}>add Log</button>
                <Modal handleClose={this.closeModal} show={isModalShown}>
                    <Form onSubmit={this.addLog} />
                </Modal>
                <Filter 
                    initialItems={initialLogs}
                    filterFunction={this.filterLogs}
                    onFilter={this.setFilteredLogs}
                />
                <div>
                    <select value={sortOrder} onChange={this.handleChange}>
                        <option key='desc' value='desc'>descending</option>
                        <option key='asc' value='asc'>ascending</option>
                    </select>
                </div>
                <List logs={logs} />
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
        setInitialLogs: (logs) => dispatch(makeAction(types.SET_INITIAL_LOGS,logs)),
        setLogs: (logs) => dispatch(makeAction(types.SET_LOGS,logs)),
        addLog: (log) => dispatch(makeAction(types.ADD_LOG,log)),
        setOrder: (order) => dispatch(makeAction(types.SET_ORDER,order))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CssModules(MainView,styles));