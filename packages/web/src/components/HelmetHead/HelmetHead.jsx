import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const HelmetHead = ({ title }) => {
  return (
    <Helmet>
      <meta
        content={title}
        property="og:title"
      />
      <title>{title}</title>
    </Helmet>
  );
};

HelmetHead.propTypes = {
  title: PropTypes.string
};

export default HelmetHead;
