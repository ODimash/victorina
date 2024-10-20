import React, { useState, useEffect } from 'react';
import './css/IntroPage.css'; // Стили для вступительной страницы

function IntroPage({ onGameStart, setShowIntro }) {
    const [isRolling, setIsRolling] = useState(false);

    const handleRollDice = () => {
        setIsRolling(true);
    };

    // Когда анимация вращения завершится через 2 секунды, запускаем игру.
    useEffect(() => {
        if (isRolling) {
            const timer = setTimeout(() => {
                setIsRolling(false);
                onGameStart(); // Начинаем игру после завершения анимации
                setShowIntro(false)
            }, 3000);
            // Очищаем таймер, если компонент размонтируется раньше

            return () => clearTimeout(timer);
        }
    }, [isRolling, onGameStart]);

    return (
        <div className="intro-page">
            <h1>Ойынға қош келдіңіз!</h1>
            <div className={`dice ${isRolling ? 'rolling' : ''}`}></div>
            <button
                className="start-game-button"
                onClick={handleRollDice}
                disabled={isRolling}
            >
                {isRolling ? 'Барлығына сәттілік...' : 'Ойынды бастау'}
            </button>

        </div>
    );
}

export default IntroPage;
