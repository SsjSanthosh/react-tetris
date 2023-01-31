import Button from "Components/Button";
import Display from "Components/Display";
import Screen from "Components/Screen";
import { useGameStatus } from "hooks/useGameStatus";
import { useInterval } from "hooks/useInterval";
import { usePlayer } from "hooks/usePlayer";
import { useScreen } from "hooks/useScreen";
import { ReactHTML, useEffect, useMemo, useRef, useState } from "react";
import { createEmptyStage, isColliding } from "utils/helpers";
import { DisplayProps } from "utils/types";
import "./styles.scss";

const App = () => {
  const { player, setPlayer, resetPlayer, movePlayer, rotateBlock } =
    usePlayer();
  const { screen, setScreen, rowsCleared, clearScreen } = useScreen(player, resetPlayer);
  const { gameOver, score, level, endGame, rows, setLevel, startGame, resetGameState } =
    useGameStatus(rowsCleared);
  const [droptime, setDropTime] = useState<null | number>(500);

  const DISPLAY_VALUES: DisplayProps[] = useMemo(() => {
    return [
      { text: "Score", value: score },
      { text: "Rows", value: rows },
      { text: "Level", value: level },
    ];
  }, [score, rows, level]);

  const screenRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.focus();
    }
  }, []);

  const updatePlayer = (val: number) => {
    const position = { x: val, y: 0 };
    if (!isColliding({ player, screen, position })) {
      movePlayer({ x: val, y: 0, collided: false });
    }
  };

  const moveBlock = ({
    keyCode,
    repeat,
  }: {
    keyCode: number;
    repeat: boolean;
  }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        // move left
        updatePlayer(-1);
      }
      if (keyCode === 39) {
        // move right
        updatePlayer(1);
      }
      if (keyCode === 40) {
        if (repeat) return;
        setDropTime(30);
      }
      if (keyCode === 38) {
        // handle rotation
        rotateBlock(screen);
      }
    }
  };

  const dropBlockEverySecond = () => {
    if (!gameOver) {
      const position = { x: 0, y: 1 };
      if (!isColliding({ player, screen, position })) {
        movePlayer({ x: 0, y: 1, collided: false });
      } else {
        if (player.blockPosition.y < 1) {
          setDropTime(null);
          endGame();
        } else movePlayer({ x: 0, y: 0, collided: true });
      }
    }
  };

  useInterval(() => {
    dropBlockEverySecond();
  }, droptime);

  useEffect(()=>{
    if(gameOver) clearScreen()
  },[gameOver, clearScreen]);

  const resetGame = () => {
    clearScreen();
    resetGameState();
    startGame()
  }


  return (
    <div
      ref={screenRef}
      onKeyDown={moveBlock}
      tabIndex={-1}
      onKeyUp={() => setDropTime(1000)}
    >
      <h1>React-Tetris</h1>
      <div className="container">
        <div className="tetris-board">
          <Screen screen={screen} player={player} />
        </div>
        <aside className="boards-container">
          {DISPLAY_VALUES.map((disp) => {
            return (
              <Display
                text={disp.text}
                value={disp.value}
                key={Math.random()}
              />
            );
          })}
          <Button
            text={gameOver ? "START GAME" : "END GAME"}
            onClick={() => {
              gameOver ? resetGame() : endGame();
            }}
          />
        </aside>
      </div>
    </div>
  );
};

export default App;
