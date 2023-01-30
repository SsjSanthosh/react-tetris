import Cell from "Components/Cell";
import React from "react";
import { createEmptyStage } from "utils/helpers";

import styles from './styles.module.scss'

const Screen = () => {
  const emptyScreen = createEmptyStage();
  return (
    <div className={styles['container']}>
      {emptyScreen.map((row) => {
        return row.map((cell, x) => {
          return <Cell />;
        });
      })}
    </div>
  );
};

export default Screen;
