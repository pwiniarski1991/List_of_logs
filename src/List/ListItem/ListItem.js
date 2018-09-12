import styles from './ListItem.css';
import CssModules from 'react-css-modules';

export const ListItem = ({user, title, description, date}) => {
    return (
        <li styleName='listItem'>
            <span styleName='user'>{user}</span>
            <span styleName='title'>{title}</span>
            <p styleName='desc'>{description}</p>
            <time styleName='date'>{date}</time>
        </li>
    );
};

export default CssModules(ListItem,styles);