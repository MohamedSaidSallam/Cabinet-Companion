import React from "react";
import { CircularProgress } from "@mui/material";
import styles from "./FullScreenProgress.module.css";

const FullScreenProgress = (props) => {
  return (
    <div className={styles.loadingWrapper}>
      <CircularProgress size={60} />
    </div>
  );
};

FullScreenProgress.propTypes = {};

export default FullScreenProgress;
