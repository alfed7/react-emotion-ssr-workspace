import { ThemeProvider } from "@emotion/react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Button } from "./components";
import { theme } from "./theme";
import { HelmetProvider } from "react-helmet-async";
import HelmetHead from "components/HelmetHead";
//import { renderRoutes } from "./components/layout";
import { Outlet } from "react-router";

const App = ({ staticContext }) => {
  return (
    <HelmetProvider context={staticContext}>
      {<HelmetHead title="React Emotion SSR Workspace 1" />}
      <ThemeProvider theme={theme}><Outlet/></ThemeProvider>
    </HelmetProvider>
  );
};

App.propTypes = {
  route: PropTypes.object,
  staticContext: PropTypes.object,
};
function mapStateToProps({ auth }) {
  return { auth };
}

const actionCreators = {};

function loadData({ dispatch }) {
  //return dispatch(someActions.doAction());
}
export default {
  loadData,
  component: connect(mapStateToProps, actionCreators)(App),
};
