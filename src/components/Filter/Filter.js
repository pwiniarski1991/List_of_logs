import React from 'react';
import PropTypes from 'prop-types';
import CssModules from 'react-css-modules';
import styles from './Filter.css';
import Dropdown from './../Dropdown/Dropdown';


export class Filter extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {filterFunction, onFilter, initialItems} = this.props;
        const val = event.target.innerText;
        const filteredItems = filterFunction(val, initialItems);
        onFilter(filteredItems, event);
    }

    render() {

        const { customClass } = this.props;

        return (
            <div styleName={`filterWrapper ${customClass}`}>
                <Dropdown 
                        id='filter'
                        placeHolder='filter Communicat' 
                        list={['success','info','fail','fatal']}
                        onChange={this.handleChange} 
                />
            </div>
        );
    }
}

Filter.propTypes = {
    initialItems: PropTypes.array.isRequired,
    filterFunction: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired
}

export default CssModules(Filter,styles,{
    allowMultiple: true
});