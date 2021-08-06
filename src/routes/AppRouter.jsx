import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { INTERVIEWS_ROUTE } from "./RouteNames";

import Interviews from "../components/Interviews";

const AppRouter = () => (
  <>
    <Router>
      <Switch>
        <Route exact path={INTERVIEWS_ROUTE} component={Interviews} />
      </Switch>
    </Router>
  </>
);

export default AppRouter;
