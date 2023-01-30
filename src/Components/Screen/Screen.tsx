import Cell from "Components/Cell";
import { BLOCKS } from "utils/constants";
import { createEmptyStage } from "utils/helpers";
import { PlayerProps, ScreenProps } from "utils/types";

import styles from "./styles.module.scss";

const Screen = ({
  screen,
  player,
}: {
  screen: ScreenProps;
  player: PlayerProps;
}) => {
  return (
    <div className={styles["container"]}>
      {screen.map((row) => {
        return row.map((cell, x) => {
          const isColorBlock = cell[0] !== 0;
          const color = isColorBlock
            ? player.blockColor
              ? player.blockColor
              : "#000"
            : "#000";
          return <Cell color={color} key={Math.random()} />;
        });
      })}
    </div>
  );
};

export default Screen;
