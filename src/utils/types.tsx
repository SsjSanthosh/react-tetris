export interface DisplayProps {
  text: string;
  value: number;
}

export interface ButtonProps {
  text: string;
  onClick: () => void;
}

export type CellProps = [number, "clear" | "collided", "string"];
export type ScreenProps = CellProps[][];
export interface BlockProps {
  shape: number[][];
  color: string;
}

export interface PlayerProps {
  blockPosition: {
    x: number;
    y: number;
  };
  block: number[][];
  collided: boolean;
  blockColor: null | string;
}


export interface StatusProps {
  level:number;
  gameOver:boolean;
  rows:number;
  score:number;
}