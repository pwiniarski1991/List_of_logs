import { createStore, applyMiddleware } from 'redux';
import rootReducer from './../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'

const initStore = (initialState = {}) => {
    if (process.browser && window.__store) {
      return window.__store
    }
  
    const middleware = [];
  
    const store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    )
  
    if (process.browser) {
      window.__store = store
    }
  
    return store;
  }

//const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default initStore();