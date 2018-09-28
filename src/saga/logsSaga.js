import api from './../config/constants';
import { call, put, takeEvery } from 'redux-saga/effects';
import {getLogs} from './../utils/Helpers';
import types from './../reducers/types';

function* fetchLogs() {
    try {
        const logs = yield call(getLogs,api.url);
        yield put({type: types.SET_INITIAL_LOGS , payload: logs});
        yield put({type: types.SET_LOGS , payload: logs});
    } catch (e) {
        yield put({type: 'LOGS_FETCH_FAILED', message: e.message});
    }
}

function* logsSaga() {
    yield takeEvery(types.FETCH_LOGS,fetchLogs);
};

export default logsSaga;