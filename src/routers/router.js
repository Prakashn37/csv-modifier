import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import DisplayCSV from '../components/DisplayCSV';
import Dashboard from '../components/Dashboard';
import Set from '../components/Set';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={Dashboard} exact={true} />
        <Route path="/upload/:set/" component={Set} />
        <Route path="/:set/" component={DisplayCSV} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
//      <Header />