import React from 'react';
import CssModules from 'react-css-modules';
import styles from './Dropdown.css';
import { connect } from 'react-redux';
import types from './../../reducers/types';
import makeAction from './../../config/reducerAction';
import { getCommunicat } from './../../utils/Helpers';
import { dict } from './../../config/constants';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

export class Dropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.placeHolder
        };
    }

    renderOptions = (options) => {
        const { title } = this.state;
        const items = options.filter(option => option !== title[1] );
        return items.map((option,i) => {
            const icon = getCommunicat(dict,option, `${option}Item`);
            return (
                React.createElement('li',{ 
                    key: option+i, 
                    styleName: 'dropDownListItem', 
                    onClick: this.selectOption
                }, icon, option));
        });
    }

    selectOption = (ev) => {
        const { innerText } = ev.target;
        let title;
        if(innerText) {
            const icon = getCommunicat(dict,innerText, `${innerText}Item`);
            title = [icon, innerText];
        } else {
            title = this.props.placeHolder;
        }
        const { id } = this.props;
        this.setState({ title });
        this.props.setDropDownOpened({id, opened: false});
        this.props.onChange(ev);
    }

    toggleMenu = (e) => {
        e && e.stopPropagation();
        const { id,Dropdown } = this.props;
        this.props.setDropDownOpened({id, opened: !Dropdown[id]});
    }

    componentDidMount() {
        const { id } = this.props;
        this.props.setDropDownOpened({id, opened: false});
    }

    render() {

        const { title } = this.state;
        const { list, Dropdown, id } = this.props;

        const menuOpened = Dropdown[id] && true; 

        const toggleMenuClass = menuOpened ? 'opened' : '';

        return (
            <div styleName='dropDownContainer'>
                <div styleName='dropDownHeader' onClick={this.toggleMenu}>
                    { title }
                    {menuOpened ? <FaChevronUp /> : <FaChevronDown /> }
                </div>
                <ul styleName={`dropDownList ${toggleMenuClass}`}>
                    <li 
                        styleName='dropDownListItem'
                        onClick={this.selectOption}
                        ></li>
                    { this.renderOptions(list) }
                </ul>
            </div>
        );
    }
}

Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    placeHolder: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        Dropdown: state.Dropdown
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDropDownOpened: (props) => dispatch(makeAction(types.SET_DROPDOWN_OPENED,props))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CssModules(Dropdown,styles, {
    allowMultiple: true
}));