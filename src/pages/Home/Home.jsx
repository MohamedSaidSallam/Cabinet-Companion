import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Header from "../../components/Header";
import FullScreenProgress from "../../components/_common/FullScreenProgress";
import ItemsList from "./ItemsList";
import Welcome from "./Welcome";

const Home = (props) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <FullScreenProgress />;
  }
  return (
    <>
      <Header />
      {isAuthenticated ? <ItemsList /> : <Welcome />}
    </>
  );
};

Home.propTypes = {};

export default Home;
