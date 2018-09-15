import react from 'react';
import styles from "./App.css";
import Header from './../Header/Header';
import List from './../List/List';
import Filter from './../components/Filter/Filter';
import {getLogs, sortItems} from './../utils/Helpers';
import {api} from './../config/constants';

export default class App extends react.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialLogs: [],
            logs: [],
            sortedType: 'desc'
        };

        this.setFilteredLogs = this.setFilteredLogs.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getLogs(api.url)
        .then(data => {
            this.setState({initialLogs: data, logs: sortItems(data, 'date', false)});
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
        this.setState({logs: filteredLogs });
    }

    handleChange(event) {
        const {initialLogs} = this.state;
        const rev = event.target.value === 'asc' ? true : false;   
        const sortedLogs = initialLogs.length ? sortItems(initialLogs, 'date',rev) : [];
        this.setState({initialLogs: sortedLogs});
        console.log('sortedLogs: ',sortedLogs);
    }

    render() {
        const {initialLogs, logs} = this.state;

        return (
            <React.Fragment>
                <Header title='List of logs' />
                <Filter 
                    initialItems={initialLogs}
                    filterFunction={this.filterLogs}
                    onFilter={this.setFilteredLogs}
                />
                <div>
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option key='desc' value='desc'>descending</option>
                        <option key='asc' value='asc'>ascending</option>
                    </select>
                </div>
                <List logs={logs} />
            </React.Fragment>
        );
    }

}