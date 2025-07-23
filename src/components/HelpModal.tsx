import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div 
        className="modal-background animate__animated animate__fadeIn" 
        onClick={onClose}
      />
      <div className="modal-content animate__animated animate__slideInDown" style={{ maxWidth: 500 }}>
        <article className="message is-dark">
          <div className="message-header">
            <p>How to Play</p>
          </div>
          <div className="message-body">
            <div className="content has-text-left">
              <h4>Objective</h4>
              <p>
                Clear the minefield without detonating any mines. Use the numbers 
                to deduce which squares are safe to click.
              </p>
              
              <h4>Controls</h4>
              <ul>
                <li><strong>Left Click:</strong> Reveal a square</li>
                <li><strong>Right Click / Long Press:</strong> Flag a square as a mine</li>
              </ul>
              
              <h4>How to Play</h4>
              <ol>
                <li>Click anywhere on the board to start</li>
                <li>Numbers show how many mines are in adjacent squares</li>
                <li>Use logic to determine which squares are safe</li>
                <li>Flag squares you think contain mines</li>
                <li>Clear all non-mine squares to win!</li>
              </ol>
              
              <h4>Tips</h4>
              <ul>
                <li>Start with squares that have fewer adjacent mines</li>
                <li>If a number equals the flagged mines around it, other adjacent squares are safe</li>
                <li>Corners and edges are often easier to solve first</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      />
    </div>
  );
};

export default HelpModal;
