import React from "react";
import styles from "./Welcome.module.css";
import Button from "../../components/_common/Button";

const Welcome = (props) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.mainMessage}>
          Cabinet Companion allows you to keep track of the items in your
          kitchen cabinet, the amount you have, and their expiration date.
        </div>
        <div className={styles.secondaryMessage}>
          log in or sign up to start using the app
        </div>
        <div className={styles.actionButtons}>
          <Button variant="contained" size="large">
            LOGIN
          </Button>
          <Button variant="outlined" size="large">
            Register
          </Button>
        </div>
      </div>
    </>
  );
};

Welcome.propTypes = {};

export default Welcome;