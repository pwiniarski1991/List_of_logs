import React from 'react';
import styles from './ListItem.css';
import CssModules from 'react-css-modules';
import { getCommunicat } from './../../../../utils/Helpers';
import { dict } from './../../../../config/constants';

export const ListItem = ({title, status, description, date}) => {

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