import CssModules from 'react-css-modules';
import styles from './Button.css';
import PropTypes from 'prop-types';

export const Button = ({text,type, disabled, onClick}) => {

    return (
        <button styleName='submitButton' type={type} disabled={disabled} onClick={onClick}>
            { text }
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

Button.defaultProps = {
    type: 'submit',
    disabled: false,
    onClick: () => {}
}

export default CssModules(Button,styles);