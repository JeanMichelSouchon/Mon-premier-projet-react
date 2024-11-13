import React from 'react';
import './GameBoard.css';
import Card from './Card.jsx';

const GameBoard = ({ cards, onCardClick }) => {
  return (
    <div className="grid">
      {cards.map((card, index) => (
        <Card key={card.id} card={card} onClick={() => onCardClick(index)} />
      ))}
    </div>
  );
};

export default GameBoard;
