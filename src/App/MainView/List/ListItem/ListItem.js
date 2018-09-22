import React from 'react';
import styles from './ListItem.css';
import CssModules from 'react-css-modules';
import { getCommunicat } from './../../../../utils/Helpers';
import { FaCheck, FaInfo, FaTimes, FaExclamation } from 'react-icons/fa';

export const ListItem = ({title, status, description, date}) => {

    const dict = {
        success: FaCheck,
        info: FaInfo,
        fail: FaTimes,
        fatal: FaExclamation
    };
    const communicat = getCommunicat(dict, status);

    return (
        <li styleName='listItem'>
            <span styleName={`communicate_${status} listItemEl`}>{communicat}</span>
            <span styleName='title listItemEl'>{title}</span>
            <p styleName='desc listItemEl'>{description}</p>
            <time styleName='date listItemEl'>{date}</time>
        </li>
    );
};

export default CssModules(ListItem,styles, {
    allowMultiple: true
});