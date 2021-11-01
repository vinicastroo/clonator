import React from 'react';

import { Switch } from 'react-router-dom';

import Login from '../Pages/Login';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={Login} />
  </Switch>
);

export default Routes;
