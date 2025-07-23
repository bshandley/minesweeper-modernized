import { useState, useCallback } from 'react';
import { Square, ProximitySquares } from '../types';
import { getRandomInt } from '../utils';

const BOARD_SIZE = 9;
const MINE_COUNT = 10;

export const useGameState = () => {
  const [squares, setSquares] = useState<Square[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [flagCount, setFlagCount] = useState(0);
  const [mineTotal, setMineTotal] = useState(MINE_COUNT);

  const generateMinePositions = useCallback((): number[] => {
    const mines: number[] = [];
    while (mines.length < MINE_COUNT) {
      const mineIndex = getRandomInt(0, BOARD_SIZE * BOARD_SIZE - 1);
      if (!mines.includes(mineIndex)) {
        mines.push(mineIndex);
      }
    }
    return mines;
  }, []);

  const getProximitySquares = useCallback(
    (squares: Square[], squareIndex: number): ProximitySquares => {
      const square = squares[squareIndex];
      const aboveIndex = squareIndex - BOARD_SIZE;
      const belowIndex = squareIndex + BOARD_SIZE;

      return {
        upperLeft:
          square.row !== 0 && square.column !== 0
            ? squares[aboveIndex - 1] || null
            : null,
        upper: square.row !== 0 ? squares[aboveIndex] || null : null,
        upperRight:
          square.row !== 0 && square.column !== BOARD_SIZE - 1
            ? squares[aboveIndex + 1] || null
            : null,
        left:
          square.column !== 0 ? squares[squareIndex - 1] || null : null,
        right:
          square.column !== BOARD_SIZE - 1
            ? squares[squareIndex + 1] || null
            : null,
        lowerLeft:
          square.row !== BOARD_SIZE - 1 && square.column !== 0
            ? squares[belowIndex - 1] || null
            : null,
        lower:
          square.row !== BOARD_SIZE - 1 ? squares[belowIndex] || null : null,
        lowerRight:
          square.row !== BOARD_SIZE - 1 && square.column !== BOARD_SIZE - 1
            ? squares[belowIndex + 1] || null
            : null,
      };
    },
    []
  );

  const calculateProximityTotal = useCallback(
    (proximitySquares: ProximitySquares): number => {
      return Object.values(proximitySquares).reduce((total, square) => {
        return total + (square?.mine ? 1 : 0);
      }, 0);
    },
    []
  );

  const initializeGame = useCallback(() => {
    const minePositions = generateMinePositions();
    const newSquares: Square[] = [];

    for (let index = 0; index < BOARD_SIZE * BOARD_SIZE; index++) {
      const rowNumber = Math.floor(index / BOARD_SIZE);
      const columnNumber = index - rowNumber * BOARD_SIZE;

      newSquares.push({
        index,
        flagged: false,
        flagIncorrect: false,
        question: false,
        mine: minePositions.includes(index),
        clicked: false,
        row: rowNumber,
        column: columnNumber,
        proximityTotal: 0,
      });
    }

    // Calculate proximity totals
    newSquares.forEach((square) => {
      const proximitySquares = getProximitySquares(newSquares, square.index);
      square.proximityTotal = calculateProximityTotal(proximitySquares);
    });

    setSquares(newSquares);
    setGameOver(false);
    setWinner(false);
    setFlagCount(0);
  }, [generateMinePositions, getProximitySquares, calculateProximityTotal]);

  const clickSquare = useCallback(
    (index: number): boolean => {
      if (gameOver || squares[index].clicked || squares[index].flagged) {
        return false;
      }

      const newSquares = [...squares];
      newSquares[index].clicked = true;

      // If it's a mine, game over
      if (newSquares[index].mine) {
        setGameOver(true);
        setWinner(false);
        setSquares(newSquares);
        return true;
      }

      // If it's an empty square, reveal adjacent squares
      if (newSquares[index].proximityTotal === 0) {
        const revealAdjacent = (squareIndex: number) => {
          const proximitySquares = getProximitySquares(newSquares, squareIndex);
          Object.values(proximitySquares).forEach((square) => {
            if (
              square &&
              !square.clicked &&
              !square.mine &&
              !square.flagged
            ) {
              square.clicked = true;
              if (square.proximityTotal === 0) {
                revealAdjacent(square.index);
              }
            }
          });
        };
        revealAdjacent(index);
      }

      setSquares(newSquares);
      return false;
    },
    [squares, gameOver, getProximitySquares]
  );

  const toggleFlag = useCallback(
    (index: number) => {
      if (gameOver || squares[index].clicked) {
        return;
      }

      const newSquares = [...squares];
      newSquares[index].flagged = !newSquares[index].flagged;
      newSquares[index].flagIncorrect =
        newSquares[index].flagged && !newSquares[index].mine;

      const newFlagCount = newSquares.filter((square) => square.flagged).length;
      setFlagCount(newFlagCount);

      // Check if all mines are flagged correctly
      const correctFlags = newSquares.filter(
        (square) => square.flagged && square.mine
      ).length;

      if (correctFlags === MINE_COUNT && newFlagCount === MINE_COUNT) {
        setGameOver(true);
        setWinner(true);
      }

      setSquares(newSquares);
    },
    [squares, gameOver]
  );

  return {
    squares,
    gameOver,
    winner,
    flagCount,
    mineTotal,
    boardSize: BOARD_SIZE,
    initializeGame,
    clickSquare,
    toggleFlag,
  };
};
