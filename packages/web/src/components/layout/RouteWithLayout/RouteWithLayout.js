import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, componentTypeId, menuCreator, route, ...rest } = props;

  if(Layout) {
    return (
      <Route
        {...rest}
        render={matchProps => (
          <Layout 
            menuCreator={menuCreator} 
          >
            <Component
              componentTypeId={componentTypeId}
              {...matchProps} 
            />
          </Layout>
        )}
      />
    );
  }
  else {
    return (
      <Route
        {...rest}
        render={matchProps => (
          <Component
            componentTypeId={componentTypeId}
            route={route}
            {...matchProps} 
          />
        )}
      />
    );
  }
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  componentTypeId: PropTypes.number,
  exact: PropTypes.bool,
  layout: PropTypes.any,
  menuCreator: PropTypes.func,
  path: PropTypes.string,
};

export default RouteWithLayout;
