import { useEffect, useState } from "react";
import { ROWPOINTS } from "utils/constants";

export const useGameStatus = (rowsCleared: number) => {
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);

  const endGame = () => setGameOver(true);
  const startGame = () => setGameOver(false);

  useEffect(() => {
    if (!gameOver && rowsCleared > 0) {
      setRows((old) => old + rowsCleared);
      setScore((old) => old + ROWPOINTS[rowsCleared - 1] * level);
    }
  }, [rowsCleared, level, gameOver]);

  const resetGameState = () => {
    setScore(0);
    setRows(0);
    setLevel(1);
  };
  return {
    gameOver,
    setGameOver,
    score,
    rows,
    level,
    setLevel,
    endGame,
    startGame,
    resetGameState,
  };
};
