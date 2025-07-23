import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './GameBoard';

const App: React.FC = () => {
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <h1 className="title">Meinsweeper</h1>
          <p className="subtitle">Please don't sue me, Microsoft.</p>
          <GameBoard />
        </div>
      </section>
    </div>
  );
};

export default App;

