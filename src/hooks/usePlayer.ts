import { useCallback, useState } from "react";
import { EMPTY_BLOCK, SCREEN_COLUMNS, SCREEN_ROWS } from "utils/constants";
import { getRandomBlock } from "utils/helpers";
import { PlayerProps } from "utils/types";

const { block, color } = getRandomBlock();

const INITIAL_STATE: PlayerProps = {
  block: block.shape,
  blockPosition: { x: Math.floor(SCREEN_COLUMNS / 2.5), y: 0 },
  collided: false,
  blockColor: color,
};

export const usePlayer = () => {
  const [player, setPlayer] = useState(INITIAL_STATE);

  const resetPlayer = useCallback(() => {
    setPlayer(INITIAL_STATE);
  }, []);

  const movePlayer = ({
    x,
    y,
    collided,
  }: {
    x: number;
    y: number;
    collided: boolean;
  }) => {
    setPlayer((old) => {
      return {
        ...old,
        blockPosition: {
          x: old.blockPosition.x + x,
          y: old.blockPosition.y + y,
          collided,
        },
      };
    });
  };

  return { player, setPlayer, resetPlayer, movePlayer };
};
