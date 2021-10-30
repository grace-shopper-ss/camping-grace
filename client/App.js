import React from "react";
import { Link, withRouter } from "react-router-dom";

import Hero from "./components/Hero";
import Routes from "./Routes";

const App = (props) => {
  const {pathname} = props.location
  const isHero = pathname === "/home" ? "landing-body" : "body";
  return (
    <div id={isHero}>
      <Hero />
      <Routes />
    </div>
  );
};

export default withRouter(App);
