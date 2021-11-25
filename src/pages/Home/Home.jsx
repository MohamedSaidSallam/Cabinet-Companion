import React from "react";
import Header from "../../components/Header";
import Welcome from "./Welcome";

const Home = (props) => {
  return (
    <>
      <Header />
      <Welcome />
    </>
  );
};

Home.propTypes = {};

export default Home;
