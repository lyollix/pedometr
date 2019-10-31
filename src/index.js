import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory } from 'history';

import 'loaders.css/loaders.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './assets/styles/main.sass';

import App from './App';

import configureStore from './store';

const dest = document.getElementById('root');

const history = createBrowserHistory();

const store = configureStore(window.__INITIAL_STATE__, history);

const render = Component => ReactDOM.render(
    <AppContainer>
        <Component history={history} store={store} />
    </AppContainer>,
    dest
);

render(App);

if (module.hot) {
    module.hot.accept('./App', () => render(App));
}
