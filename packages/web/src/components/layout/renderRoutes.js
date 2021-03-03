import React from 'react';
import { Switch } from 'react-router';
import RouteWithLayout from './RouteWithLayout';

export function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <RouteWithLayout
          component={route.component}
          exact={route.exact}
          key={route.key || i}
          layout={route.layout}
          menuCreator={route.menuCreator}
          path={route.path}
          route={route}
          strict={route.strict}
          // render={props =>
          //   route.render ? (
          //     route.render({ ...props, ...extraProps, route: route })
          //   ) : (
          //     <route.component {...props} {...extraProps} route={route} />
          //   )
          // }
        />
      ))}
    </Switch>
  ) : null;
}
