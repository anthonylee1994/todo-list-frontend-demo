import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { ConnectedRouter } from 'connected-react-router';


let Router = DefaultRouter;
Router = ConnectedRouter;


const routes = [
  {
    "component": require('/Users/anthony/Documents/Development/AntTeam/Test/SectionB/todo-list-frontend/src/layouts/index.tsx').default,
    "routes": [
      {
        "path": "/index.html",
        "exact": true,
        "component": () => React.createElement(require('/Users/anthony/Documents/Development/AntTeam/Test/SectionB/todo-list-frontend/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/index.html' })
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index/page.tsx').default
      }
    ]
  }
];

export default function() {
  return (
<Router history={window.g_history}>
  { renderRoutes(routes) }
</Router>
  );
}
