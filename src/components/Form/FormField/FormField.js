import React from 'react';
import CssModules from 'react-css-modules';
import styles from './FormField.css'
import { throws } from 'assert';

export class FormField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.validate = this.validate.bind(this);
        this.setFieldValue = this.setFieldValue.bind(this);
    }

    validate() {
        const { value } = this.state;
        let error = ''
        let validated = true;
        if(value === '' || !isNaN(el)) {
            validated = false;
            error = 'empty string or number typed in';
        }

        if(value === 'date') {
            dateFormat = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');
            validated = dateFormat.test(el);
            if(!validated) {
                 error = 'incorrect format of date field';
                 validated = false;
            }
        }
        if(error) {
            this.props.setError(value,error);
        }

        return validated;
    }

    setFieldValue(ev) {
        const { id, value } = ev.target;
        this.setState({
            [id]: value,
        });
        this.props.setValue(id,value)
    }

    render() {

        const { value} = this.state;
        const { field, errors } = this.props;

        console.log('field: ', field);

        return (
            <div styleName='formField'>
                <label htmlFor={field}>{field}: </label>
                <input id={field} type='text' name={field} value={value} 
                onChange={this.setFieldValue} onBlur={this.validate} />
                { errors && Object.entries(errors)
                .map(([key,value]) =>{
                    return (<div key={key} styleName='formError'>{ value }</div>);
                })
                }
            </div>
        );
    }
}

export default CssModules(FormField,styles, {
    allowMultiple: true
});