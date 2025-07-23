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
    <div className={`modal ${isOpen ? 'is-active' : ''}`} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      />
      <div style={{
        position: 'relative',
        maxWidth: '400px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        animation: 'slideInDown 0.3s ease'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '16px 16px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>Top 10 Scores</h3>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e6ed' }}>
                <th style={{ width: '15%', padding: '0.5rem', textAlign: 'left', fontSize: '0.9rem', color: '#666' }}>#</th>
                <th style={{ width: '55%', padding: '0.5rem', textAlign: 'left', fontSize: '0.9rem', color: '#666' }}>Name</th>
                <th style={{ width: '30%', padding: '0.5rem', textAlign: 'right', fontSize: '0.9rem', color: '#666' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {scores.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ 
                    textAlign: 'center', 
                    fontStyle: 'italic', 
                    padding: '2rem',
                    color: '#666'
                  }}>
                    No scores yet. Be the first!
                  </td>
                </tr>
              ) : (
                scores.map((record, index) => (
                  <tr key={index} style={{ 
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background-color 0.2s ease'
                  }}>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: '600', color: '#667eea' }}>{index + 1}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{record.name}</td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'monospace' }}>
                      {formatTime(record.score)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoardModal;
