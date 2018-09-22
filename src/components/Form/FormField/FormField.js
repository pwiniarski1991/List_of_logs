import React from 'react';
import CssModules from 'react-css-modules';
import styles from './FormField.css'

const getSelectOptions = (options) => {
    let selectOptions;
    selectOptions = options.map((value,i) => {
            return <option key={i+1} value={value}>{value}</option>
        });
    selectOptions = [React.createElement('option',{key: 0}),...selectOptions];
    return selectOptions;
}

const renderField = (props) => {
    const { input, type } = props;
    const {name, onBlur, onChange} = input;
    const options = ['success','info','fatal','info'];
    const elements = {
        input: React.createElement('input',{id: name, type, name, onBlur, onChange, styleName: 'field'}),
        select: React.createElement('select',{id: name, onBlur, onChange, styleName: 'field'}, getSelectOptions(options))
    };

    if(name !== 'status') {
        return elements.input
    } else {
        return elements.select;
    }
}

export const FormField = (props) => {
    const { name } = props.input;
    const { touched, error } = props.meta;
    const customErrorClass = error && touched ? 'error' : '';
    return (
        <div styleName={`formField ${customErrorClass}`}>
            {/* <pre>{ JSON.stringify(meta,0,2) }</pre> */}
            <label styleName='labelField' htmlFor={name}>{name}: </label>
            { renderField(props) }
            { customErrorClass && <span>{ error }</span> }
        </div>
    );
};

export default CssModules(FormField,styles, {
    allowMultiple: true
});