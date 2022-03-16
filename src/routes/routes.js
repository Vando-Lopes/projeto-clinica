import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admin from "../pages/admin/admin"

const Routes = () => (
  <Switch>
      <Route path='/' exact component={Admin} />
  </Switch>
);

export default Routes;