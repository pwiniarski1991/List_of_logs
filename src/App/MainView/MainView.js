import react from 'react';
import styles from './MainView.css';
import List from './List/List';
import Filter from './../../components/Filter/Filter';
import {getLogs, sortItems} from './../../utils/Helpers';
import {api} from './../../config/constants';
import CssModules from 'react-css-modules';
import Modal from './../../components/Modal/Modal';
import Form from './../../components/Form/Form';

export class MainView extends react.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialLogs: [],
            logs: [],
            isDesc: true,
            isModalShown: false
        };

        this.setFilteredLogs = this.setFilteredLogs.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addLog = this.addLog.bind(this);
    }

    componentDidMount() {
        getLogs(api.url)
        .then(data => {
            this.setState({initialLogs: sortItems(data, 'date'), logs: sortItems(data, 'date')});
            return data;
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
        const {isDesc} = this.state;
        this.setState({logs: sortItems(filteredLogs,'date',isDesc)});
    }

    handleChange(event) {
        const {logs} = this.state;
        const isDesc = event.target.value === 'desc' ? true : false;
        const sortedLogs = logs.length ? sortItems(logs, 'date',isDesc) : [];
        this.setState({logs: sortedLogs, isDesc});
    }

    addLog(log) {
        const logs = this.state.logs.push(log);
        this.setState({logs });
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
        const {initialLogs, logs, sortOrder, isModalShown} = this.state;

        return (
            <React.Fragment >
                <button onClick={this.openModal}>add Log</button>
                <Modal handleClose={this.closeModal} show={isModalShown}>
                    <Form addLog={this.addLog} />
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

export default CssModules(MainView,styles);