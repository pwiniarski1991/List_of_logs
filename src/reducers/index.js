import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { setInitialLogs, setLogs, setOrder } from './mainReducer';

export default combineReducers({
    form: formReducer,
    initialLogs: setInitialLogs,
    logs: setLogs,
    isDesc: setOrder
});