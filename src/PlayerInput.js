import React, { useState } from 'react';
import './css/PlayerInput.css';

function PlayerInput({ startGame }) {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [players, setLocalPlayers] = useState([]); // Локальное состояние для игроков

  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      setError('Введите имя игрока');
      return;
    }

    // Проверка на дублирование имен
    if (players.some(player => player.name === playerName.trim())) {
      setError('Игрок с таким именем уже добавлен');
      return;
    }

    const newPlayer = { name: playerName, score: 0 };
    setLocalPlayers(prev => [...prev, newPlayer]);
    setPlayerName('');
    setError('');
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      setError('Добавьте хотя бы 2 игрока');
      return;
    }
    console.log('players in input:', players)
    startGame([...players]);
  };

  return (
    <div className="player-input-container">
      <h1>Ойыншлардың атын енгізіңіз</h1>
      <input
        type="text"
        placeholder="Ойыншының аты"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleAddPlayer}>Ойыншы қосу</button>
      <button onClick={handleStartGame}>Ойынды бастау</button>

      {/* Список добавленных игроков */}
      {players.length > 0 && (
        <div className="player-list">
          <h2>Ойыншылар тізімі:</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlayerInput;
