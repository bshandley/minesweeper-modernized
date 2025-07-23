import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
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
        maxWidth: '500px',
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
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>How to Play</h3>
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
        <div style={{ padding: '1.5rem', textAlign: 'left', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#667eea', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>Objective</h4>
            <p style={{ margin: '0 0 1rem 0', color: '#555' }}>
              Clear the minefield without detonating any mines. Use the numbers 
              to deduce which squares are safe to click.
            </p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#667eea', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>Controls</h4>
            <ul style={{ margin: '0 0 1rem 0', paddingLeft: '1.2rem' }}>
              <li style={{ marginBottom: '0.3rem' }}><strong>Left Click:</strong> Reveal a square</li>
              <li style={{ marginBottom: '0.3rem' }}><strong>Right Click / Long Press:</strong> Flag a square as a mine</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#667eea', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>How to Play</h4>
            <ol style={{ margin: '0 0 1rem 0', paddingLeft: '1.2rem' }}>
              <li style={{ marginBottom: '0.3rem' }}>Click anywhere on the board to start</li>
              <li style={{ marginBottom: '0.3rem' }}>Numbers show how many mines are in adjacent squares</li>
              <li style={{ marginBottom: '0.3rem' }}>Use logic to determine which squares are safe</li>
              <li style={{ marginBottom: '0.3rem' }}>Flag squares you think contain mines</li>
              <li style={{ marginBottom: '0.3rem' }}>Clear all non-mine squares to win!</li>
            </ol>
          </div>
          
          <div>
            <h4 style={{ color: '#667eea', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>Tips</h4>
            <ul style={{ margin: '0', paddingLeft: '1.2rem' }}>
              <li style={{ marginBottom: '0.3rem' }}>Start with squares that have fewer adjacent mines</li>
              <li style={{ marginBottom: '0.3rem' }}>If a number equals the flagged mines around it, other adjacent squares are safe</li>
              <li style={{ marginBottom: '0.3rem' }}>Corners and edges are often easier to solve first</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
