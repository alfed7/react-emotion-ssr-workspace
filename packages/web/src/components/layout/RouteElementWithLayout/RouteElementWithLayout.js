import React from 'react';
import PropTypes from 'prop-types';

const RouteElementWithLayout = props => {
  const { layout: Layout, component: Component, componentTypeId, menuCreator, route, ...rest } = props;

  if(Layout) {
    return (
      <Layout 
        menuCreator={menuCreator} 
      >
        <Component
          componentTypeId={componentTypeId}
          {...rest} 
        />
      </Layout>
    );
  }
  else {
    return (
      <Component
        componentTypeId={componentTypeId}
        route={route}
        {...rest}
      />
    );
  }
};

RouteElementWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  componentTypeId: PropTypes.number,
  exact: PropTypes.bool,
  layout: PropTypes.any,
  menuCreator: PropTypes.func,
  path: PropTypes.string,
};

export default RouteElementWithLayout;
