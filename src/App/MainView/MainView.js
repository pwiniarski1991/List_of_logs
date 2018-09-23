import react from 'react';
import styles from './MainView.css';
import List from './List/List';
import { sortItems } from './../../utils/Helpers';
import CssModules from 'react-css-modules';
import Modal from './../../components/Modal/Modal';
import Button from './../../components/Button/Button';
import Form from './../../components/Form/Form';
import { connect } from 'react-redux';
import showResults from './../../utils/FormHelper';
import types from './../../reducers/types';
import makeAction from './../../config/reducerAction';

export class MainView extends react.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalShown: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    addLog = (log) => {
        this.props.addLog(log);
        this.closeModal();
        showResults(log);
    }

    openModal = () => {
        this.setState({
            isModalShown: true
        });
    }

    closeModal = () => {
        this.setState({
            isModalShown: false
        });
    }

    render() {
        const { isModalShown } = this.state;
        const { logs } = this.props;

        return (
            <React.Fragment >
                <Button text='add Log' type='button' onClick={this.openModal} />
                <Modal handleClose={this.closeModal} show={isModalShown}>
                    <Form onSubmit={this.addLog} />
                </Modal>
                <List logs={logs} />
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        logs: sortItems(state.logs, 'date',state.isDesc),
        isDesc: state.isDesc
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addLog: (log) => dispatch(makeAction(types.ADD_LOG,log))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CssModules(MainView,styles));