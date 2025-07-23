import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Minesweeper title', () => {
  render(<App />);
  const titleElement = screen.getByText(/minesweeper/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Microsoft disclaimer', () => {
  render(<App />);
  const disclaimerElement = screen.getByText(/please don't sue me, microsoft/i);
  expect(disclaimerElement).toBeInTheDocument();
});

test('renders game board component', () => {
  render(<App />);
  // The game board should be present
  const gameBoard = screen.getByRole('application', { name: /game board/i });
  expect(gameBoard).toBeInTheDocument();
});
