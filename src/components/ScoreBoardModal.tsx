import React from 'react';
import { Score } from '../types';
import { formatTime } from '../utils';

interface ScoreBoardModalProps {
  isOpen: boolean;
  scores: Score[];
  onClose: () => void;
}

const ScoreBoardModal: React.FC<ScoreBoardModalProps> = ({
  isOpen,
  scores,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div 
        className="modal-background animate__animated animate__fadeIn" 
        onClick={onClose}
      />
      <div className="modal-content animate__animated animate__slideInDown" style={{ maxWidth: 400 }}>
        <article className="message is-dark">
          <div className="message-header">
            <p>Top 10 Scores</p>
          </div>
          <div className="message-body">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>#</th>
                  <th style={{ width: '60%' }}>Name</th>
                  <th style={{ width: '30%', textAlign: 'right' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {scores.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', fontStyle: 'italic' }}>
                      No scores yet. Be the first!
                    </td>
                  </tr>
                ) : (
                  scores.map((record, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{record.name}</td>
                      <td style={{ textAlign: 'right' }}>
                        {formatTime(record.score)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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

export default ScoreBoardModal;
