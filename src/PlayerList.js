import React from 'react';

function PlayerList({ players }) {
  return (
    <div>
      <h2>Ойыншылар:</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name}: {player.score} ұпай
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
