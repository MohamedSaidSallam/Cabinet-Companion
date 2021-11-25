import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import ItemsList from "./ItemsList";
import Welcome from "./Welcome";
import styles from "./Home.module.css";

const Home = (props) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <CircularProgress size={60} />
      </div>
    );
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
