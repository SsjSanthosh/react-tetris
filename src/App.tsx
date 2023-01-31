import Button from "Components/Button";
import Display from "Components/Display";
import Screen from "Components/Screen";
import { useGameStatus } from "hooks/useGameStatus";
import { useInterval } from "hooks/useInterval";
import { usePlayer } from "hooks/usePlayer";
import { useScreen } from "hooks/useScreen";
import { useEffect, useMemo, useRef, useState } from "react";
import { isColliding } from "utils/helpers";
import { DisplayProps } from "utils/types";
import "./styles.scss";

const App = () => { 
  const { player, resetPlayer, movePlayer, rotateBlock } = usePlayer();
  const { screen, rowsCleared, clearScreen } = useScreen(player, resetPlayer);
  const {
    gameOver,
    score,
    level,
    endGame,
    rows,
    startGame,
    resetGameState,
  } = useGameStatus(rowsCleared);
  const [droptime, setDropTime] = useState<null | number>(500);

  const DISPLAY_VALUES: DisplayProps[] = useMemo(() => {
    return [
      { text: "Score", value: score },
      { text: "Rows", value: rows },
      { text: "Level", value: level },
    ];
  }, [score, rows, level]);

  const screenRef = useRef<HTMLDivElement>(null);

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
    if (!gameOver && !player.collided) {
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

  useEffect(() => {
    if (gameOver) clearScreen();
  }, [gameOver, clearScreen]);

  const focusOnGameArea = () => {
    if (screenRef.current) {
      screenRef.current.focus();
    }
  };

  const handleKeyUp = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === 40) {
      setDropTime(1000);
    }
  };

  const resetGame = () => {
    clearScreen();
    resetGameState();
    focusOnGameArea();
    startGame();
  };

  const handleTouchScreen = (e: TouchEvent) => {
    if (!gameOver && !player.collided) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const leftMove = width / 3;
      const rightMove = width / 1.5;
      const verticalLeftBorder = leftMove;
      const verticalRightBorder = rightMove;
      const verticalBottomBorder = height / 2;
      const { clientX, clientY } = e.touches[0];
      // move left

      if (clientX <= leftMove) {
        updatePlayer(-1);
      } else if (clientX >= rightMove) {
        updatePlayer(1);
      }
      if (
        clientY < verticalBottomBorder &&
        clientX > verticalLeftBorder &&
        clientX < verticalRightBorder
      ) {
        rotateBlock(screen);
      }
    }
  };

  return (
    <div
      ref={screenRef}
      onKeyDown={moveBlock}
      onKeyUp={handleKeyUp}
      onTouchStart={(e: any) => handleTouchScreen(e)}
      onTouchEnd={() => setDropTime(1000)}
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
