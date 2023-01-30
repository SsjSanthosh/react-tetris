import { BlockProps } from "./types";

export const SCREEN_ROWS = 20;
export const SCREEN_COLUMNS = 12;

export const EMPTY_BLOCK: BlockProps = { shape: [[0]], color: "#000" };

export const BLOCKS: { [x: string]: BlockProps } = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    color: "#50E3E6",
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    color: "#245FDF",
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    color: "#DFAD24",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#DFD924",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "#30D338",
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    color: "#843DC6",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "#E34E4E",
  },
};
