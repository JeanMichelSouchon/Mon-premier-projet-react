import React, { useState, useEffect } from 'react';
import './App.css';
import GameTitle from './Component/GameTitle.js';
import NewGameButton from './Component/NewGameButton.js';
import Score from './Component/Score.js';
import GameBoard from './Component/GameBoard.js';
import WinMessage from './Component/WinMessage.js';

const MemoryGame = () => {
  const generateCards = () => {
    const values = Array(8).fill(null).map((_, i) => i + 1);
    const allValues = [...values, ...values];
    return allValues.sort(() => Math.random() - 0.5).map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
  };

  const [cards, setCards] = useState(generateCards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || isGameOver) return;

    const newCards = cards.map((card, i) => i === index ? { ...card, isFlipped: true } : card);
    const newFlippedCards = [...flippedCards, index];

    setCards(newCards);
    setFlippedCards(newFlippedCards);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].value === cards[second].value) {
        const newCards = cards.map(card =>
          card.value === cards[first].value ? { ...card, isMatched: true } : card
        );
        setCards(newCards);
        setFlippedCards([]);
        setScore(score + 1);
      } else {
        setTimeout(() => {
          const newCards = cards.map((card, i) =>
            i === first || i === second ? { ...card, isFlipped: false } : card
          );
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, score]);

  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      setIsGameOver(true);
    }
  }, [cards]);

  const newGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div className="memory-game">
      <GameTitle />
      <NewGameButton onClick={newGame} />
      <Score score={score} />
      <GameBoard cards={cards} onCardClick={handleCardClick} />
      {isGameOver && <WinMessage />}
    </div>
  );
};

export default MemoryGame;
