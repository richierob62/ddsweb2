import './fa/css/font-awesome.min.css';
import './bootstrap/bs4.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { getRoutes } from './routes';
import configureStore from './configureStore';
import Root from './Root';
import './index.css';

const store = configureStore();
// store.runSaga(rootSaga);

ReactDOM.render(
  <Root
    store={store}
    history={browserHistory}
    routes={getRoutes(store)} />,
  document.getElementById('root')
);
