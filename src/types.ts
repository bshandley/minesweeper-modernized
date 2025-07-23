export interface Square {
  index: number;
  flagged: boolean;
  flagIncorrect: boolean;
  question: boolean;
  mine: boolean;
  clicked: boolean;
  row: number;
  column: number;
  proximityTotal: number;
}

export interface GameState {
  boardSize: number;
  content: Square[];
  gameOver: boolean;
  winner: boolean;
  timerCount: number;
  flagCount: number;
  correctFlagCount: number;
  mineTotal: number;
  recordTime: boolean;
  playerName: string;
}

export interface Score {
  name: string;
  score: number;
}

export interface ProximitySquares {
  upperLeft: Square | null;
  upper: Square | null;
  upperRight: Square | null;
  left: Square | null;
  right: Square | null;
  lowerLeft: Square | null;
  lower: Square | null;
  lowerRight: Square | null;
}
