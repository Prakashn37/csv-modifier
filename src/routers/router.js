import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import DisplayCSV from '../components/DisplayCSV';
import Dashboard from '../components/Dashboard';
import FileSet from '../components/FileSet';
import NotFoundPage from '../components/NotFoundPage';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={Dashboard} exact={true} />
        <Route path="/upload/:set/" component={FileSet} />
        <Route path="/:set/" component={DisplayCSV} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
//      <Header />