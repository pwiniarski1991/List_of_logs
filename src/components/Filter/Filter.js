import React from 'react';
import PropTypes from 'prop-types';
import CssModules from 'react-css-modules';
import styles from './Filter.css';
import { getCommunicat } from './../../utils/Helpers';
import { FaCheck, FaInfo, FaTimes, FaExclamation } from 'react-icons/fa';

export class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            option: '' 
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {filterFunction, onFilter, initialItems} = this.props;
        const val = event.target.value;
        this.setState({option: val});
        const filteredItems = filterFunction(val, initialItems);
        onFilter(filteredItems);
    }

    render() {
        const {option} = this.state;

        return (
            <div styleName='filterWrapper'>
                <label htmlFor='communicate'>Choose communicate: </label>
                <select id='communicate' value={option} onChange={this.handleChange}>
                    <option></option>
                    { ['success','info','fail','fatal'].map((item,i) => {
                    return (<option key={item+i} value={item}>{item}</option>)
                    })}
            </select>
            </div>
        );

    }
}

Filter.propTypes = {
    initialItems: PropTypes.array.isRequired,
    filterFunction: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired
}

export default CssModules(Filter,styles);