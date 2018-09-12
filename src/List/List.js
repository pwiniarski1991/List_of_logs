import React from 'react';
import ListItem from './ListItem/ListItem';

export default class List extends React.Component {

    render() {
        return (
            <ul>
                <li>First</li>
                <li>Second</li>
                <li>Third</li>
                <li>Fourth</li>
            </ul>
        );
    }

}