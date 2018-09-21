import React from 'react';
import CssModules from 'react-css-modules';
import styles from './Modal.css'
import { FaTimes} from 'react-icons/fa';

const Modal = ({handleClose, show, children}) => {

    const modalToggleClass = show ? '' : 'closed'; 
    
    return(
        <div styleName={`modal ${modalToggleClass}`}>
            <section styleName='modalHeader'>
                <button styleName='closeModal' onClick={handleClose}>
                    <FaTimes />
                </button>
            </section>
            <section styleName='modalContent'>
                { children }
            </section>
        </div>
    );
}

export default CssModules(Modal,styles, {
    allowMultiple: true
});