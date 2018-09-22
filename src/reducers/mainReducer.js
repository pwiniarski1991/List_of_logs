import types from './types';

export const setInitialLogs = (state = [], action) => {
    if(action.type === types.SET_INITIAL_LOGS) {
        return action.payload;
    }
    else if(action.type === types.ADD_LOG) {
        return [...state,action.payload]
    } else {
        return state;
    }
}

export const setLogs = (state = [], action) => {
    if(action.type === types.SET_LOGS) {
        return action.payload;
    } 
    else if(action.type === types.ADD_LOG) {
        return [...state,action.payload]
    } else {
        return state;
    }
}

export const setOrder = (state = true,action) => {
    if(action.type === types.SET_ORDER) {
        return action.payload;
    } else {
        return state;   
    }
}