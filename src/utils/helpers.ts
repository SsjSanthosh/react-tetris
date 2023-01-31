import { BLOCKS, SCREEN_COLUMNS, SCREEN_ROWS } from "./constants";
import { PlayerProps, ScreenProps } from "./types";

export const createEmptyStage = (): ScreenProps => {
  return Array.from(Array(SCREEN_ROWS), () => {
    return new Array(SCREEN_COLUMNS).fill([0, "clear", "#000"]);
  });
};

export const getRandomBlock = () => {
  const blocks = Object.keys(BLOCKS);
  const randomKey = blocks[Math.floor(Math.random() * blocks.length)] as string;
  return { block: BLOCKS[randomKey], color: BLOCKS[randomKey].color };
};

export const isColliding = ({
  player,
  screen,
  position,
}: {
  player: PlayerProps;
  screen: ScreenProps;
  position: { x: number; y: number };
}) => {
  const { block } = player;
  for (let y = 0; y < block.length; y++) {
    for (let x = 0; x < block[y].length; x++) {
      if (block[y][x] !== 0) {
        if (
          !screen[y + player.blockPosition.y + position.y] ||
          !screen[y + player.blockPosition.y + position.y][
            x + player.blockPosition.x + position.x
          ] ||
          screen[y + player.blockPosition.y + position.y][
            x + player.blockPosition.x + position.x
          ][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
