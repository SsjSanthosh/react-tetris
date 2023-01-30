import { SCREEN_COLUMNS, SCREEN_ROWS } from "./constants";

export const createEmptyStage = () => {
  return Array.from(Array(SCREEN_ROWS), () => {
    return new Array(SCREEN_COLUMNS).fill([0, "clear"]);
  });
};
