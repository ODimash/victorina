import React, { useState, useEffect } from 'react';
import { initialCategories } from './initialCategories';
import './css/GameBoard.css'

function GameBoard({ players, setPlayers, nextPlayer, currentPlayer }) {
  const [categories, setCategories] = useState(initialCategories);
  const [openedTasks, setOpenedTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState(null); // Выбранный вопрос
  const [showAnswer, setShowAnswer] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false); // Статус завершения игры

   useEffect(() => {
    if (checkGameOver()) {
      setIsGameOver(true);
    }
   }, [openedTasks]);

  const checkGameOver = () => {
    const totalTasks = categories.reduce(
      (sum, category) => sum + category.tasks.length,
      0
    );
    const openedCount = Object.keys(openedTasks).length;
    return totalTasks === openedCount; // Ойын аяқталды!, если все задания выполнены
  };

	const handleTaskClick = (categoryIndex, taskIndex) => {
	  const key = `${categoryIndex}-${taskIndex}`;
		if (openedTasks[key]) return; // Проверяем, если задача уже открыта
		const newOpenedTasks = { ...openedTasks, [key]: true };
    // setOpenedTasks(newOpenedTasks);

    const task = categories[categoryIndex].tasks[taskIndex];
    setSelectedTask({ ...task, categoryIndex, taskIndex }); // Открываем диалог с вопросом
  };

  const handleCorrectAnswer = () => {
    updateScore(selectedTask.points);
    closeTask();
  };

  const handleIncorrectAnswer = () => {
    updateScore(-selectedTask.points);
    closeTask();
  };

  const updateScore = (points) => {
    const newPlayers = [...players];
    newPlayers[currentPlayer].score += points; // Начисляем или вычитаем очки
    setPlayers(newPlayers);
    nextPlayer(); // Переход хода
  };

  const closeTask = () => {
    const key = `${selectedTask.categoryIndex}-${selectedTask.taskIndex}`;
    setOpenedTasks({ ...openedTasks, [key]: true });
    setSelectedTask(null);
    setShowAnswer(false);
  };

  const getWinner = () => {
    const maxScore = Math.max(...players.map(player => player.score));
    return players.find(player => player.score === maxScore)?.name || 'Ничья';
  };

 return (
    <div className="container">
      <h2>Кезек: <span className="current-turn">{players[currentPlayer].name}</span></h2>

      <div className="scoreboard">
        {players.map((player, index) => (
          <div key={index} className="player">
            {player.name}: {player.score} очков
          </div>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            {categories.map((category, index) => (
              <th key={index}>{category.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories[0]?.tasks.map((_, rowIndex) => (
            <tr key={rowIndex}>
              {categories.map((category, colIndex) => {
                const key = `${colIndex}-${rowIndex}`;
                return (
                  <td
                    key={colIndex}
                    onClick={() => handleTaskClick(colIndex, rowIndex)}
                  >
                    {openedTasks[key] ? '✔️' : category.tasks[rowIndex].points}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <div className="modal">
          <h2>Сұрақ</h2>
          <p>{selectedTask.question}</p>
          {selectedTask.image && <img src={selectedTask.image} alt="Question illustration" />}
          {!showAnswer ? (
            <button onClick={() => setShowAnswer(true)}>Жауабын көрсету</button>
          ) : (
            <>
              <p><strong>Жауап:</strong> {selectedTask.answer}</p>
              <button onClick={handleCorrectAnswer}>Дұрыс</button>
              <button className="incorrect" onClick={handleIncorrectAnswer}>Қате</button>
            </>
          )}
        </div>
      )}

      {isGameOver && (
        <div className="modal">
          <h2>Ойын аяқталды!!</h2>
          <p className="winner">Жеңімпаз: {getWinner()}</p>
          <button onClick={() => window.location.reload()}>Жаңа ойын</button>
        </div>
      )}
    </div>
  );}

export default GameBoard;
