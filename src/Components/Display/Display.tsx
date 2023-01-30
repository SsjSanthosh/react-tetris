import React from "react";
import { DisplayProps } from "utils/types";
import styles from "./styles.module.scss";

const Display = ({ text, value }: DisplayProps) => {
  return (
    <div className={styles["container"]}>
      <h2>{text}:</h2>
      <h2>{value}</h2>
    </div>
  );
};

export default Display;
