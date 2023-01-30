import { BLOCKS, SCREEN_COLUMNS, SCREEN_ROWS } from "./constants";
import { ScreenProps } from "./types";

export const createEmptyStage = (): ScreenProps => {
  return Array.from(Array(SCREEN_ROWS), () => {
    return new Array(SCREEN_COLUMNS).fill([0, "clear"]);
  });
};

export const getRandomBlock = () => {
  const blocks = Object.keys(BLOCKS);
  const randomKey = blocks[Math.floor(Math.random() * blocks.length)] as string;
  return { block: BLOCKS[randomKey], color: BLOCKS[randomKey].color };
};
