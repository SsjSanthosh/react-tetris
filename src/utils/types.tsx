export interface DisplayProps {
  text: string;
  value: number;
}

export interface ButtonProps {
  text: string;
  onClick: () => void;
}

export interface CellProps {
  pos?: {
    x: number;
    y: number;
  };
}
