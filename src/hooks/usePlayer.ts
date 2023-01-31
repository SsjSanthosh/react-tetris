import { useCallback, useState } from "react";
import { SCREEN_COLUMNS } from "utils/constants";
import { getRandomBlock, isColliding } from "utils/helpers";
import { PlayerProps, ScreenProps } from "utils/types";

export const usePlayer = () => {
  const getNewPlayer = (start: boolean = true) => {
    const { block, color } = getRandomBlock();
    const newState: PlayerProps = {
      block: block.shape,
      blockPosition: { x: Math.floor(SCREEN_COLUMNS / 2.5), y: 0 },
      collided: false,
      blockColor: color,
    };
    return newState;
  };

  const resetPlayer = useCallback(() => {
    setPlayer(getNewPlayer());
  }, []);
  const [player, setPlayer] = useState<PlayerProps>(getNewPlayer());

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
        },
        collided,
      };
    });
  };

  const rotateBlock = (screen: ScreenProps) => {
    const newPlayer = { ...player };
    const newBlock = newPlayer.block.map((_, idx) =>
      newPlayer.block.map((col) => col[idx])
    );
    newPlayer.block = newBlock.map((row) => row.reverse());
    const position = { x: 0, y: 0 };
    if (isColliding({ player: newPlayer, screen, position })) {
      newPlayer.blockPosition.x =
        newPlayer.blockPosition.x < 0
          ? newPlayer.blockPosition.x + newPlayer.block[0].length
          : newPlayer.blockPosition.x - newPlayer.block[0].length;
    }
    setPlayer({ ...newPlayer });
  };

  return {
    player,
    setPlayer,
    resetPlayer,
    movePlayer,
    rotateBlock,
    getNewPlayer,
  };
};
