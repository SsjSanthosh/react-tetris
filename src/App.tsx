import Button from "Components/Button";
import Display from "Components/Display";
import Screen from "Components/Screen";
import { usePlayer } from "hooks/usePlayer";
import { useScreen } from "hooks/useScreen";
import { ReactHTML, useEffect, useMemo, useRef } from "react";
import { createEmptyStage } from "utils/helpers";
import { DisplayProps } from "utils/types";
import "./styles.scss";

const App = () => {
  const DISPLAY_VALUES: DisplayProps[] = useMemo(() => {
    return [
      { text: "Score", value: 50 },
      { text: "Rows", value: 10 },
      { text: "Level", value: 2 },
    ];
  }, []);
  const { player, setPlayer, resetPlayer, movePlayer } = usePlayer();
  const { screen, setScreen } = useScreen(player);
  const screenRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (screenRef.current) {
  //     screenRef.current.focus();
  //   }
  // }, []);

  const moveBlock = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === 37) {
      // move left
      movePlayer({ x: -1, y: 0, collided: false });
    }
    if (keyCode === 39) {
      // move right
      movePlayer({ x: 1, y: 0, collided: false });
    }
    if (keyCode === 40) {
      movePlayer({ x: 0, y: 1, collided: false });
    }
    if (keyCode === 38) {
      // handle rotation
    }
  };

  return (
    <div ref={screenRef} onKeyDown={moveBlock} tabIndex={-1}>
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
          <Button text={"START GAME"} onClick={() => console.log("hey")} />
        </aside>
      </div>
    </div>
  );
};

export default App;
