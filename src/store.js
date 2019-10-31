import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { form, walks } from './reducers';

export default function configureStore(initialState = {}, history) {
    let finalCreateStore;

    if (process.env.NODE_ENV === 'development' && process.env.__CLIENT__) {
        const { persistState } = require('redux-devtools');

        finalCreateStore = compose(
            applyMiddleware(thunk, routerMiddleware(history)),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(createStore);
    } else {
        finalCreateStore = applyMiddleware(thunk, routerMiddleware(history))(createStore);
    }
    const store = finalCreateStore(combineReducers({
        form,
        walks,
        router: connectRouter(history),
        routing: routerReducer,
        toastr: toastrReducer
    }), initialState);

    // For hot reloading reducers
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers');
            store.replaceReducer(combineReducers({
                ...nextReducer
            }));
        });
    }

    return store;
}
