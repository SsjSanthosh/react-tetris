import Cell from "Components/Cell";
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
          return <Cell color={cell[2]} key={Math.random()} />;
        });
      })}
    </div>
  );
};

export default Screen;
