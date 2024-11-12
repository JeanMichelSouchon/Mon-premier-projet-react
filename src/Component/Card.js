import React from 'react';
import './Card.css';

const Card = ({ card, onClick }) => {
  return (
    <div
      className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
      onClick={onClick}
    >
      {card.isFlipped || card.isMatched ? card.value : '?'}
    </div>
  );
};

export default Card;
