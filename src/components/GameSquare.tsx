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
    // Handle flagged squares first (regardless of whether it's a mine)
    if (square.flagged && !gameOver) return '#dc3545'; // Bright red for better contrast
    
    // Handle mines that are revealed during game over
    if (square.mine && gameOver) return 'white';
    
    // Handle proximity numbers
    switch (square.proximityTotal) {
      case 1: return '#007bff'; // Modern blue
      case 2: return '#28a745'; // Modern green
      case 3: return '#dc3545'; // Modern red
      case 4: return '#6f42c1'; // Modern purple
      case 5: return '#fd7e14'; // Modern orange
      case 6: return '#20c997'; // Modern teal
      case 7: return '#343a40'; // Modern dark gray
      case 8: return '#6c757d'; // Modern gray
      default: return '#6c757d';
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
    width: '32px',
    height: '32px',
    border: '1px solid #e0e6ed',
    fontWeight: '700',
    fontSize: '13px',
    color: getSquareColor(),
    userSelect: 'none',
    borderRadius: '2px',
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
