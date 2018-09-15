import react from 'react';
import styles from "./App.css";
import Header from './../Header/Header';
import List from './../List/List';
import Filter from './../components/Filter/Filter';
import {getLogs, sortItems} from './../utils/Helpers';
import {api} from './../config/constants';
import CssModules from 'react-css-modules';

export class App extends react.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialLogs: [],
            logs: [],
            isDesc: true
        };

        this.setFilteredLogs = this.setFilteredLogs.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    render() {
        const {initialLogs, logs, sortOrder} = this.state;

        return (
            <React.Fragment>
                <Header title='List of logs' />
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

export default CssModules(App,styles);