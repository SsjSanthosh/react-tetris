import React from "react";
import styles from "./styles.module.scss";

const Cell = ({ color }: { color: string }) => {
  return (
    <div
      className={styles["container"]}
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default Cell;
