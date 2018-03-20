import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import { ConnectedRouter } from 'connected-react-router';


let Router = DefaultRouter;
Router = ConnectedRouter;


export default function() {
  return (
<Router history={window.g_history}>
  <Switch>
    <Route exact path="/" component={require('../index/page.tsx').default} />
    <Route exact path="/list" component={require('../list/page.tsx').default} />
  </Switch>
</Router>
  );
}
