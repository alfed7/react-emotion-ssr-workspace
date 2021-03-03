import { Fragment } from "react";
import HelmetHead from "components/HelmetHead";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <HelmetHead title="Home page" />
      <h1>Home</h1>
      <Link to="/about">About</Link>
    </Fragment>
  );
};

export default { component: Home };
