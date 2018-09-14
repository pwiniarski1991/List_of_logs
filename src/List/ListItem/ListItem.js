import React from 'react';
import styles from './ListItem.css';
import CssModules from 'react-css-modules';
import { FaCheck, FaInfo, FaTimes, FaExclamation } from 'react-icons/fa';

function getComunicate(status) {
    let icon;
    switch(status) {
        case 'success': icon=FaCheck;
                        break;
        case 'info': icon=FaInfo;
                    break;
        case 'fail': icon=FaTimes;
                    break;
        case 'fatal': icon=FaExclamation;
                    break;
        default:
            icon='';
    };
    return React.createElement(icon);
}

export const ListItem = ({title, status, description, date}) => {

    const comunicate = getComunicate(status);

    return (
        <li styleName='listItem'>
            <span styleName={`communicate_${status} listItemEl`}>{comunicate}</span>
            <span styleName='title listItemEl'>{title}</span>
            <p styleName='desc listItemEl'>{description}</p>
            <time styleName='date listItemEl'>{date}</time>
        </li>
    );
};

export default CssModules(ListItem,styles, {
    allowMultiple: true
});