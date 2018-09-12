const ListItem = ({user, title, description, date}) => {
    return (
        <li>
            <h3>{user}</h3>
            <span>{title}</span>
            <p>{description}</p>
            <time>{date}</time>
        </li>
    );
};

export default ListItem;