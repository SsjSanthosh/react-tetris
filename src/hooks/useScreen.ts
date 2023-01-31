import { useCallback, useEffect, useMemo, useState } from "react";
import { createEmptyStage } from "utils/helpers";
import { CellProps, PlayerProps, ScreenProps } from "utils/types";

export const useScreen = (player: PlayerProps, resetPlayer: () => void) => {
  const [screen, setScreen] = useState(createEmptyStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  useEffect(() => {
    const clearRows = (newScreen: ScreenProps) => {
      setRowsCleared(0);
      return newScreen.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          // row is full
          setRowsCleared((old) => old + 1);
          ack.unshift(
            new Array(newScreen[0].length).fill([0, "clear", "#000"])
          );
          return ack;
        }
        ack.push(row);
        return ack;
      }, [] as ScreenProps);
    };

    const updateScreen = (oldScreen: ScreenProps) => {
      const newScreen = oldScreen.map((row) => {
        // erase old instance of the player block, check for clear
        // this is to eliminate the trail of blocks once movement starts
        return row.map((cell) => {
          return cell[1] === "clear" ? [0, "clear", "#000"] : cell;
        });
      });
      // draw block at the new position after erasing the old trail
      player.block.map((row, y) => {
        return row.map((cell, x) => {
          if (cell !== 0) {
            newScreen[y + player.blockPosition.y][x + player.blockPosition.x] =
              [
                1,
                `${player.collided ? "collided" : "clear"}`,
                `${player.blockColor}`,
              ];
          }
        });
      });
      if (player.collided) {
        resetPlayer();
        return clearRows(newScreen as ScreenProps);
      }
      return newScreen as ScreenProps;
    };
    setScreen((old) => updateScreen(old));
  }, [
    player.blockPosition.x,
    player.blockPosition.y,
    player.collided,
    player.block,
    resetPlayer,
    player.blockColor,
  ]);

  const clearScreen = useCallback(() => {
    setScreen(createEmptyStage());
    setRowsCleared(0);
  }, []);

  return { screen, setScreen, rowsCleared, clearScreen };
};
