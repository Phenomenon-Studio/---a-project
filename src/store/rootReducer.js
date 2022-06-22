import { combineReducers } from '@reduxjs/toolkit';
import snackbarReducer from './slices/snackbarSlice';

const createReducer = asyncReducers => (state, action) => {
    const combinedReducer = combineReducers({
        snackbar: snackbarReducer,
        ...asyncReducers,
    });

    return combinedReducer(state, action);
};

export default createReducer;
