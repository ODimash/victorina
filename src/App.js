import React, { useEffect, useState } from 'react';
import PlayerList from './PlayerList';
import GameBoard from './GameBoard';
import CurrentPlayer from './CurrentPlayer';
import PlayerInput from './PlayerInput';

function App() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = (enteredPlayers) => {
    setPlayers(enteredPlayers)
  };

  useEffect(() => {
    if (players.length >= 2) {
      console.log('Обновленные игроки:', players);
      setGameStarted(true);
    }
  }, [players]);

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  return (
    <div>
      {!gameStarted ? (
        <PlayerInput startGame={startGame}/>
      ) : (
        <>
          {/* <CurrentPlayer player={players[currentPlayer].name} /> */}
          {/* <PlayerList players={players} /> */}
          <GameBoard players={players} setPlayers={setPlayers} currentPlayer={currentPlayer} nextPlayer={nextPlayer} />
        </>
      )}
    </div>
  );
}

export default App;
