import React from 'react';
import { Route } from 'react-router';
import RouteElementWithLayout from './RouteElementWithLayout';

export function renderRoutes(routes) {
  return routes ? (
      routes.map((route, i) => (
        <Route 
          key={route.key || i}
          path={route.path}
          element={
            <RouteElementWithLayout
              component={route.component}
              exact={route.exact}
              layout={route.layout}
              menuCreator={route.menuCreator}
              route={route}
              strict={route.strict}
              // render={props =>
              //   route.render ? (
              //     route.render({ ...props, ...extraProps, route: route })
              //   ) : (
              //     <route.component {...props} {...extraProps} route={route} />
              //   )
              // }
            />}
        >{renderRoutes(route.children)}</Route>
      ))
  ) : null;
}
