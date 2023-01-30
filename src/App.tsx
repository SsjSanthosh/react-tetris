import Button from "Components/Button";
import Display from "Components/Display";
import Screen from "Components/Screen";
import { useMemo } from "react";
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
  return (
    <div className="container">
      <h1>React-Tetris</h1>
      <main className="tetris-board">
        <Screen />
      </main>
      <aside className="boards-container">
        {DISPLAY_VALUES.map((disp) => {
          return <Display text={disp.text} value={disp.value} />;
        })}
        <Button text={"START GAME"} onClick={() => console.log("hey")} />
      </aside>
    </div>
  );
};

export default App;
