import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame = () => {
  const GenerateCarte = () => { //init carte
    const values = Array(8).fill(null).map((_, i) => i + 1);// tableau de 8 élements rempli de chiffre aléatoire entre 1 et 8
    const allValues = [...values, ...values];  //tableau pour contenir chaque valeur deux fois pour faire les paires 
    return allValues.sort(() => Math.random() - 0.5).map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
  };

  const [Cartes, setCarte] = useState(GenerateCarte);
  const [CarteRetournee, setCarteRetournee] = useState([]);
  const [score, setScore] = useState(0);
  const [IsGameOver, setIsGameOver] = useState(false); 


  const ClickCarte = (index) => {
    if (CarteRetournee.length === 2 || Cartes[index].isFlipped || IsGameOver) return;

    const newCartes = Cartes.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    const newCarteRetournee = [...CarteRetournee, index];

    setCarte(newCartes);
    setCarteRetournee(newCarteRetournee);
  };

//Vérifie si les deux cartes retournée sont bien des paires
  useEffect(() => {
    if (CarteRetournee.length === 2) {
      const [first, second] = CarteRetournee;
      if (Cartes[first].value === Cartes[second].value) {
        const newCartes = Cartes.map((card) =>
          card.value === Cartes[first].value ? { ...card, isMatched: true } : card
        );
        setCarte(newCartes);
        setCarteRetournee([]);
        setScore(score + 1);
      } else {
        setTimeout(() => {
          const newCartes = Cartes.map((card, i) =>
            i === first || i === second ? { ...card, isFlipped: false } : card
          );
          setCarte(newCartes);
          setCarteRetournee([]);
        }, 1000);
      }
    }
  }, [CarteRetournee, Cartes, score]);


  //vérifie si la partie est fini
  useEffect(() => {

    if (Cartes.every(card => card.isMatched)) {
      setIsGameOver(true);
    }
  }, [Cartes]);

  const NewGame = () => {
    setCarte(GenerateCarte());
    setCarteRetournee([]);
    setScore(0);
    setIsGameOver(false); 
  };

  
  return (
    <div className="memory-game">
      <h1>Jeu de Memory</h1>
      <button onClick={NewGame}>Nouvelle Partie</button>
      <div className="score">Score: {score}</div>
      
      <div className="grid">
        {Cartes.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
            onClick={() => ClickCarte(index)}
          >
            {card.isFlipped || card.isMatched ? card.value : '?'}
          </div>
        ))}
        {IsGameOver && <div className="win-message">Bravo, vous avez gagné ! </div>}
      </div>
    </div>
  );
};

export default MemoryGame;
