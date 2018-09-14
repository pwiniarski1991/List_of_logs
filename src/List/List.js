import React from 'react';
import ListItem from './ListItem/ListItem';
import styles from './List.css';
import CssModules from 'react-css-modules';

export class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logs: []
        };
    }

    componentDidMount() {
        this.getLogs()
        .then(data => {
            this.setState({logs: data});
            return data;
        });
    }

    getLogs() {
        return fetch('http://my-json-server.typicode.com/pwiniarski1991/List_of_logs/logs')
        .then(response => response.json());
    }

    render() {
        console.log(this.state.logs);

        if(!this.state.logs.length) {
            return null;
        } 

        return (
            <ul styleName='logsList'>
                {this.state.logs.map((log,i) => {
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

export default CssModules(List, styles);