import React, { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faBomb } from '@fortawesome/free-solid-svg-icons';
import { Square } from '../types';

interface GameSquareProps {
  square: Square;
  gameOver: boolean;
  onSquareClick: () => void;
  onLongPress: () => void;
  onLongPressEnd: () => void;
}

const GameSquare: React.FC<GameSquareProps> = ({
  square,
  gameOver,
  onSquareClick,
  onLongPress,
  onLongPressEnd,
}) => {
  const getSquareContent = (): React.ReactNode => {
    if (square.flagged && !gameOver) {
      return <FontAwesomeIcon icon={faFlag} className="animate__animated animate__wobble" />;
    }
    
    if (square.mine && gameOver) {
      return <FontAwesomeIcon icon={faBomb} className="animate__animated animate__flash" />;
    }
    
    if (square.clicked && !square.mine && square.proximityTotal > 0) {
      return square.proximityTotal;
    }
    
    return '';
  };

  const getSquareColor = (): string => {
    if (square.mine) return 'white';
    if (square.flagged && !gameOver) return 'black';
    
    switch (square.proximityTotal) {
      case 1: return 'blue';
      case 2: return 'green';
      case 3: return 'red';
      case 4: return 'darkblue';
      case 5: return 'darkred';
      case 6: return 'darkturquoise';
      case 7: return 'black';
      default: return 'gray';
    }
  };

  const getBackgroundColor = (): string => {
    if (square.mine && (square.clicked || gameOver)) {
      return 'red';
    }
    if (square.clicked && square.proximityTotal === 0) {
      return '#e6e6e6';
    }
    return 'white';
  };

  const squareStyle: CSSProperties = {
    textAlign: 'center',
    background: getBackgroundColor(),
    cursor: gameOver ? 'default' : 'pointer',
    position: 'relative',
    width: '30px',
    height: '30px',
    border: '1px solid #ccc',
    fontWeight: 'bold',
    fontSize: '14px',
    color: getSquareColor(),
    userSelect: 'none',
  };

  const contentStyle: CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    margin: 'auto',
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!gameOver) {
      onLongPress();
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    onLongPressEnd();
    if (!gameOver && !square.flagged) {
      onSquareClick();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!gameOver) {
      onLongPress();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    onLongPressEnd();
    if (!gameOver && !square.flagged) {
      onSquareClick();
    }
  };

  return (
    <td
      style={squareStyle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="game-square"
    >
      <div style={contentStyle}>
        {getSquareContent()}
      </div>
    </td>
  );
};

export default GameSquare;
