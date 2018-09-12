const ListItem = ({title, description, date}) => {
    return (
        <li>
            <span>{title}</span>
            <p>{description}</p>
            <time>{date}</time>
        </li>
    );
};

export default ListItem;