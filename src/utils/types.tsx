export interface DisplayProps {
  text: string;
  value: number;
}

export interface ButtonProps {
  text: string;
  onClick: () => void;
}

export type CellProps = [number, "clear" | "collided"];
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
