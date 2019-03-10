import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import AddProductPage from './containers/AddProductPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.ADDPRODUCTS} component={AddProductPage} />
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
