import React from "react";
import { ButtonProps } from "utils/types";

import styles from "./styles.module.scss";

const Button = ({ text, onClick }: ButtonProps) => {
  return <button className={styles["container"]} onClick={onClick}>{text}</button>;
};

export default Button;
