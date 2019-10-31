import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import { MainContainer } from './containers';

function App({ history, store }) {
  return (
      <Provider store={store}>
          <ConnectedRouter history={history}>
              <Switch>
                  <Route path="/" component={MainContainer} />
              </Switch>
          </ConnectedRouter>
      </Provider>
  );
}

App.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    store: PropTypes.shape({
        dispatch: PropTypes.func.isRequired
    }).isRequired
};

export default App;
