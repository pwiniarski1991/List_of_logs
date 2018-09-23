import React from 'react';
import CssModules from 'react-css-modules';
import styles from './Form.css'
import FormField from './FormField/FormField';
import Button from './../Button/Button';
import { connect } from 'react-redux';
import { reduxForm, Field, blur } from 'redux-form';

const validate = (values) => {
    const errors = {};
    const dateFormat = new RegExp('([1-2]*[0-9]{3})-((1[0-2]{1})|(0[0-9]{1}))-((3[0-1])|([0-2][0-9]))');
    
    ['status', 'title', 'details', 'date'].forEach(field => {
        if(!values[field]) {
            errors[field] = 'is Required';
        } else if(field === 'date' && !dateFormat.test(values[field])) {
            errors[field] = 'incorrect format date. Type like this XXXX-XX-XX';
        }
    });

    return errors;
};

const renderFields = () => {
    const formFields = ['status', 'title', 'details', 'date'].map(field => {
        const type = field!=='date' ? 'text' : 'date'; 
        return (
            <Field 
                key={field}
                name={field}
                type={type}
                component={FormField}
                placeholder={field}
            />
        );
    });

    return formFields;
};

export const Form = ({pristine, submitting, handleSubmit}) => {
 
    return (
        <form styleName='formLogs' onSubmit={handleSubmit} 
        validators={{
            '': { validate },
        }} >
            <div styleName='formGroup'>
                { renderFields() }
                <div styleName='buttonBox'>
                    <Button text='add Log' disabled={pristine || submitting} />
                </div>           
            </div>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        form: state.form
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setValue: (field, value) => dispatch(blur('formLogs',field,value))
    }
};

const connectedForm = connect(mapStateToProps, mapDispatchToProps)(CssModules(Form,styles, {
    allowMultiple: true
}));

export default reduxForm({
    form: 'formLogs',
    validate
})(connectedForm); 