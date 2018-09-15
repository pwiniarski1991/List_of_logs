import React from 'react';
import ListItem from './ListItem/ListItem';
import styles from './List.css';
import CssModules from 'react-css-modules';
import Loader from 'react-loader-spinner'

export class List extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {logs} = this.props;

        if(!logs.length) {
            return(
                <Loader type="TailSpin" color="green" height={80} width={80} />
            )
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

export default CssModules(List, styles);