import React from 'react';
import CssModules from 'react-css-modules';
import styles from './Dropdown.css';
import { getCommunicat } from './../../utils/Helpers';
import { FaCheck, FaInfo, FaTimes, FaExclamation, FaChevronDown } from 'react-icons/fa';

export class Dropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpened: false,
            title: this.props.placeHolder
        };
    }

    renderOptions = (options) => {
        return options.map((option,i) => React.createElement('li',
         { key: option+i, styleName: 'dropDownListItem', onClick: this.selectOption},getCommunicat(option), option));
    }

    selectOption = (ev) => {
        const { innerText } = ev.target;
        this.setState({ 
            title: innerText,
            menuOpened: false
        });
        this.props.onChange(ev);
    }

    toggleMenu = () => {
        const { menuOpened } = this.state;
        this.setState({
            menuOpened: !menuOpened
        });
    }

    render() {

        const { title, menuOpened } = this.state;
        const { list } = this.props;

        const toggleMenuClass = menuOpened ? 'opened' : '';

        return (
            <div styleName='dropDownContainer'>
                <div styleName='dropDownHeader' onClick={this.toggleMenu}>
                    { title }
                    <FaChevronDown />
                </div>
                <ul styleName={`dropDownList ${toggleMenuClass}`}>
                    { this.renderOptions(list) }
                </ul>
            </div>
        );
    }
}

export default CssModules(Dropdown,styles,{
    allowMultiple: true
});