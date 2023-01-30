import { useEffect, useState } from "react";
import { createEmptyStage } from "utils/helpers";
import { CellProps, PlayerProps, ScreenProps } from "utils/types";

export const useScreen = (player: PlayerProps) => {
  const [screen, setScreen] = useState(createEmptyStage());
  useEffect(() => {
    const updateScreen = (oldScreen: ScreenProps) => {
      const newScreen = oldScreen.map((row) => {
        // erase old instance of the player block, check for clear
        // this is to eliminate the trail of blocks once movement starts
        return row.map((cell) => {
          return cell[1] === "clear" ? [0, "clear"] : cell;
        });
      });
      // draw block at the new position after erasing the old trail
      player.block.map((row, y) => {
        return row.map((cell, x) => {
          if (cell !== 0) {
            newScreen[y + player.blockPosition.y][x + player.blockPosition.x] =
              [1, `${player.collided ? "collided" : "clear"}`];
          }
        });
      });
      return newScreen as ScreenProps;
    };
    setScreen((old) => updateScreen(old));
  }, [
    player.blockPosition.x,
    player.blockPosition.y,
    player.collided,
    player.block,
  ]);
  return { screen, setScreen };
};
