import React from 'react';

import { Switch } from 'react-router-dom';

import Main from '../Pages/Main';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Main} />
  </Switch>
);

export default Routes;
