import { configureStore, compose } from '@reduxjs/toolkit';
import createReducer from './rootReducer';

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default;

        store.replaceReducer(newRootReducer.createReducer());
    });
}

const hideBase64InResultsList = data => ({
    ...data,
    attachment: {
        ...data.attachment,
        pdfDataUri: '<<LARGE_BASE64>>',
    },
});

const actionSanitizer = action => {
    switch (action.type) {
        case 'results/setResults':
            return {
                ...action,
                payload: action.payload.map(hideBase64InResultsList),
            };
        default:
            return action;
    }
};

const stateSanitizer = state => {
    if (state.results?.list?.length) {
        return {
            ...state,
            results: {
                ...state.results,
                list: state.results.list.map(hideBase64InResultsList),
            },
        };
    }

    return state;
};

const reduxDevtoolsExtensionOptions = {
    actionSanitizer,
    stateSanitizer,
};

const composeEnhancers =
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(reduxDevtoolsExtensionOptions)
        : compose;

const store = configureStore({
    reducer: createReducer(),
    devTools: false,
    enhancers: defaultEnhancers => [...defaultEnhancers, composeEnhancers()],
});

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
    if (store.asyncReducers[key]) {
        return false;
    }

    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));

    return store;
};

export default store;
