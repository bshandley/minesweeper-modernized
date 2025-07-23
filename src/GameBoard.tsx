import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faBomb, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';
import { formatTime } from './utils';
import { getScores, postScore } from './api';
import { Score } from './types';
import ScoreBoardModal from './components/ScoreBoardModal';
import HelpModal from './components/HelpModal';
import GameSquare from './components/GameSquare';
import './GameBoard.css';

const GameBoard: React.FC = () => {
  const {
    squares,
    gameOver,
    winner,
    flagCount,
    mineTotal,
    boardSize,
    initializeGame,
    clickSquare,
    toggleFlag,
  } = useGameState();

  const { seconds, start, stop, reset } = useTimer();
  
  const [playerName, setPlayerName] = useState('Anonymous');
  const [scores, setScores] = useState<Score[]>([]);
  const [scoresModalOpen, setScoresModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [isRecordTime, setIsRecordTime] = useState(false);
  const [longPressTimeout, setLongPressTimeout] = useState<NodeJS.Timeout | null>(null);

  // Load scores on component mount
  useEffect(() => {
    loadScores();
  }, []);

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle game over state
  useEffect(() => {
    if (gameOver) {
      stop();
      if (winner) {
        checkForRecordTime();
      }
    }
  }, [gameOver, winner, stop, seconds]);

  const loadScores = async () => {
    const fetchedScores = await getScores();
    setScores(fetchedScores);
  };

  const checkForRecordTime = () => {
    if (scores.length === 0 || seconds < scores[scores.length - 1].score || scores.length < 10) {
      setIsRecordTime(true);
    }
  };

  const handleSubmitScore = async () => {
    const success = await postScore(playerName, seconds);
    if (success) {
      await loadScores();
      setScoresModalOpen(true);
    }
    handleNewGame();
  };

  const handleNewGame = () => {
    reset();
    setIsRecordTime(false);
    setPlayerName('Anonymous');
    initializeGame();
  };

  const handleSquareClick = useCallback((index: number) => {
    if (squares.length === 0) return;
    
    // Start timer on first click
    if (seconds === 0 && !gameOver) {
      start();
    }
    
    const hitMine = clickSquare(index);
    if (hitMine) {
      stop();
    }
  }, [squares, seconds, gameOver, start, stop, clickSquare]);

  const handleLongPress = useCallback((index: number) => {
    const timeout = setTimeout(() => {
      toggleFlag(index);
      setLongPressTimeout(null);
    }, 500);
    setLongPressTimeout(timeout);
  }, [toggleFlag]);

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  }, [longPressTimeout]);

  const toggleModal = (modalType: 'scores' | 'help') => {
    if (modalType === 'scores') {
      setScoresModalOpen(!scoresModalOpen);
    } else {
      setHelpModalOpen(!helpModalOpen);
    }
  };

  const renderGameBoard = () => {
    if (squares.length === 0) return null;

    const rows = [];
    for (let i = 0; i < boardSize; i++) {
      const rowSquares = [];
      for (let j = 0; j < boardSize; j++) {
        const index = i * boardSize + j;
        const square = squares[index];
        
        rowSquares.push(
          <GameSquare
            key={index}
            square={square}
            gameOver={gameOver}
            onSquareClick={() => handleSquareClick(index)}
            onLongPress={() => handleLongPress(index)}
            onLongPressEnd={handleLongPressEnd}
          />
        );
      }
      rows.push(<tr key={i}>{rowSquares}</tr>);
    }
    
    return (
      <table className="game-table">
        <tbody>{rows}</tbody>
      </table>
    );
  };

  const renderGameOverModal = () => {
    if (!gameOver) return null;

    return (
      <div className="game-over-overlay">
        {winner ? (
          <div className="message is-primary animate__animated animate__pulse">
            <div className="message-body">
              <div className="has-text-centered">
                <p className="is-size-1">
                  <FontAwesomeIcon icon={faTrophy} />
                </p>
              </div>
              {isRecordTime && (
                <div className="field">
                  <p>Record Time: {formatTime(seconds)}</p>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value.slice(0, 14))}
                      onFocus={() => setPlayerName('')}
                      placeholder="Your Name"
                      maxLength={14}
                    />
                  </div>
                </div>
              )}
              <button className="button is-primary" onClick={handleSubmitScore}>
                New Game
              </button>
            </div>
          </div>
        ) : (
          <div className="message is-danger animate__animated animate__bounceIn">
            <div className="message-body">
              <div className="has-text-centered">
                <p className="is-size-3">You Lose!</p>
              </div>
              <button className="button is-danger" onClick={handleNewGame}>
                New Game
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="game-board" role="application" aria-label="Game Board">
      <div className="game-header">
        <div className="timer is-size-4">{formatTime(seconds)}</div>
        <div className="mine-counter is-size-5">
          Mines: {mineTotal - flagCount}
        </div>
      </div>
      
      {renderGameBoard()}
      {renderGameOverModal()}
      
      <div className="game-footer">
        <button 
          className="button is-link is-small"
          onClick={() => toggleModal('scores')}
        >
          Scores
        </button>
        <span className="mx-2">|</span>
        <button 
          className="button is-link is-small"
          onClick={() => toggleModal('help')}
        >
          Help
        </button>
        <span className="mx-2">|</span>
        <a
          href="https://github.com/bshandley"
          target="_blank"
          rel="noopener noreferrer"
          className="button is-link is-small"
        >
          GitHub
        </a>
        <span className="mx-2">|</span>
        <a
          href="http://handley.io"
          target="_blank"
          rel="noopener noreferrer"
          className="button is-link is-small"
        >
          Connect
        </a>
      </div>

      <ScoreBoardModal
        isOpen={scoresModalOpen}
        scores={scores}
        onClose={() => toggleModal('scores')}
      />
      
      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => toggleModal('help')}
      />
    </div>
  );
};

export default GameBoard;
