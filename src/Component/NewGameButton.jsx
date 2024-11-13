import React from 'react';
import './NewGameButton.css';

const NewGameButton = ({ onClick }) => {
  return <button onClick={onClick}>Nouvelle Partie</button>;
};

export default NewGameButton;
