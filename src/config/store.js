import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './../reducers/index';
import logsSaga from './../saga/logsSaga';
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware();
const initStore = (initialState = {}, sagaMiddleware) => {
    if (process.browser && window.__store) {
      return window.__store
    }
  
    const store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    )
  
    if (process.browser) {
      window.__store = store
    }

    sagaMiddleware.run(logsSaga);
  
    return store;
  }

//const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default initStore({},sagaMiddleware);