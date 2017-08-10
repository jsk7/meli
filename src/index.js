import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import routes from './routes';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
require('./favicon.ico');
import './styles/simple-grid.scss';
import './styles/common.scss';
import './styles/variables.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);
