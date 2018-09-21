import React from 'react';
import CssModules from 'react-css-modules';
import styles from './Form.css'
import FormField from './FormField/FormField';

export class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Values: {
                status: '',
                header: '',
                desc: '',
                date: ''
            },
            formErrors : {
                status: [],
                header: [],
                desc: [],
                date: []
            }
        };

        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setError = this.setError.bind(this);
        this.setValue = this.setValue.bind(this);
        this.renderFormField = this.renderFormField.bind(this);
    }

    setValue(field,value ) {
        const { Values } = this.state;
        Values[field] = value;

        this.setState({
            Values
        });
    }

    setError(field, error) {
        const { formErrors } = this.state;
        formErrors[field] = error;

        this.setState({
            formErrors
        });
    }

    validateForm() {
        const { formErrors, Values } = this.state;
        let validated = true;
        Object.keys(Values).forEach(el => {
            if(Values[el] === '') {
                formErrors[el].push('empty string');
                validated = false;
            }
            else if(!isNaN(Values[el])) {
                formErrors[el].push('should not be number');
                validated = false;
            }
            else if(el === 'date') {
                const dateFormat = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');
                validated = dateFormat.test(Values[el]);
                if(!validated) {
                    formErrors[el].push('incorrect format of date field');
                    validated = false;
                }
            }
        });

        return validated;
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const correct = this.validateForm();
        console.log('correct: ', correct);
        if(correct) {
            const log = {
                status,
                title: header,
                details: desc,
                date
            };
            this.props.addLog(log);
        }

        this.setState({
            formErrors: this.state.formErrors
        });

    }

    renderFormField() {
        const { formErrors } = this.state;
        const formFields = ['status', 'header', 'desc', 'date'].map(field => {
            console.log(field);
            return (<FormField 
                    key={field}
                    field={field}
                    errors={formErrors[field]}
                    setError={this.setError}
                    setValue={this.setValue}
                    />);
        });

        return formFields;
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit} >
                <div styleName='formGroup'>
                    { this.renderFormField() }            
                    <button type='submit'>add Log</button>
                </div>
            </form>
        );
    }
}

export default CssModules(Form,styles, {
    allowMultiple: true
});