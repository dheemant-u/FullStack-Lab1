import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MathGame.css';

// Simple SVGs or Emojis for counting
const ITEMS = ['🍎', '🍌', 'dheemant', '🐶', '🐱', '🚗', '⭐', '🎈'];

const MathGame = () => {
    const [gameMode, setGameMode] = useState(null); // 'counting' or 'addition'
    const [score, setScore] = useState(0);
    const [question, setQuestion] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    // Selection Box State
    const [selectionBox, setSelectionBox] = useState(null); // { startX, startY, currentX, currentY }
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedIndices, setSelectedIndices] = useState([]);

    const gameAreaRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        if (gameMode) {
            generateQuestion();
        }
    }, [gameMode]);

    // Keyboard Event Listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!gameMode || !question) return;

            const key = parseInt(e.key, 10);
            if (!isNaN(key)) {
                // If it's a number key, check if it's a valid option
                // For simplistic design, we just define ranges or check directly
                // Here we assume options are 1-5 or 0-10, so key presses 0-9 work directly
                // For 10, we'd need special handling or just '0' for '10' if we wanted (not implemented here)
                handleAnswer(key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameMode, question, score]); // Dependencies for closure variables

    const generateQuestion = () => {
        setFeedback('');
        setShowConfetti(false);
        setSelectedIndices([]);
        setSelectionBox(null);

        if (gameMode === 'counting') {
            const count = Math.floor(Math.random() * 5) + 1; // 1 to 5 items
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            setQuestion({ type: 'counting', count, item });
        } else if (gameMode === 'addition') {
            const num1 = Math.floor(Math.random() * 5); // 0 to 4
            const num2 = Math.floor(Math.random() * 5); // 0 to 4
            setQuestion({ type: 'addition', num1, num2, answer: num1 + num2 });
        }
    };

    const handleAnswer = (userAnswer) => {
        let isCorrect = false;
        if (gameMode === 'counting') {
            isCorrect = userAnswer === question.count;
        } else if (gameMode === 'addition') {
            isCorrect = userAnswer === question.answer;
        }

        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback('🎉 Correct! Great Job! 🎉');
            setShowConfetti(true);
            setTimeout(generateQuestion, 2000); // Wait 2 seconds before next question
        } else {
            setFeedback('❌ Try again! You can do it!');
        }
    };

    // Mouse Event Handlers for Rectangular Selection
    const getRelativeCoordinates = (e) => {
        if (!gameAreaRef.current) return { x: 0, y: 0 };
        const rect = gameAreaRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseDown = (e) => {
        if (gameMode !== 'counting') return;
        // Don't start selection if clicking a button
        if (e.target.tagName === 'BUTTON') return;

        const { x, y } = getRelativeCoordinates(e);
        setIsSelecting(true);
        setSelectionBox({ startX: x, startY: y, currentX: x, currentY: y });
        setSelectedIndices([]);
    };

    const handleMouseMove = (e) => {
        if (!isSelecting || !selectionBox) return;

        const { x, y } = getRelativeCoordinates(e);
        setSelectionBox(prev => ({ ...prev, currentX: x, currentY: y }));

        // Collision Detection
        checkSelectionCollision(selectionBox.startX, selectionBox.startY, x, y);
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        setSelectionBox(null);
        // Optional: Auto-submit if selected count matches? 
        // For now, let's keep it manual answering to require explicit action
    };

    const checkSelectionCollision = (startX, startY, endX, endY) => {
        if (!itemsRef.current) return;

        const left = Math.min(startX, endX);
        const top = Math.min(startY, endY);
        const right = Math.max(startX, endX);
        const bottom = Math.max(startY, endY);

        const newSelectedIndices = [];

        itemsRef.current.forEach((item, index) => {
            if (item) {
                const itemRect = item.getBoundingClientRect();
                const containerRect = gameAreaRef.current.getBoundingClientRect();

                // Calculate item position relative to container
                const itemLeft = itemRect.left - containerRect.left;
                const itemTop = itemRect.top - containerRect.top;
                const itemRight = itemLeft + itemRect.width;
                const itemBottom = itemTop + itemRect.height;

                // Check intersection
                if (
                    itemLeft < right &&
                    itemRight > left &&
                    itemTop < bottom &&
                    itemBottom > top
                ) {
                    newSelectedIndices.push(index);
                }
            }
        });

        setSelectedIndices(newSelectedIndices);
    };


    const renderCountingGame = () => {
        if (!question) return null;
        const itemsArray = Array(question.count).fill(question.item);

        return (
            <div
                className="game-area"
                ref={gameAreaRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ position: 'relative', userSelect: 'none' }} // Prevent text selection
            >
                <h2>Count the items!</h2>

                {/* Selection Box Render */}
                {isSelecting && selectionBox && (
                    <div className="selection-box" style={{
                        left: Math.min(selectionBox.startX, selectionBox.currentX),
                        top: Math.min(selectionBox.startY, selectionBox.currentY),
                        width: Math.abs(selectionBox.currentX - selectionBox.startX),
                        height: Math.abs(selectionBox.currentY - selectionBox.startY)
                    }} />
                )}

                <div className="items-container">
                    {itemsArray.map((item, index) => (
                        <span
                            key={index}
                            className={`game-item ${selectedIndices.includes(index) ? 'selected' : ''}`}
                            ref={el => itemsRef.current[index] = el}
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <div className="options-container">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <button key={num} className="option-btn" onClick={() => handleAnswer(num)}>
                            {num}
                        </button>
                    ))}
                </div>

                {selectedIndices.length > 0 && (
                    <div style={{ marginTop: '10px', fontSize: '1.2rem', color: '#007bff' }}>
                        Items selected: {selectedIndices.length}
                    </div>
                )}
            </div>
        );
    };

    const renderAdditionGame = () => {
        if (!question) return null;
        return (
            <div className="game-area">
                <h2>Add the numbers!</h2>
                <div className="math-problem">
                    <span>{question.num1}</span>
                    <span>+</span>
                    <span>{question.num2}</span>
                    <span>=</span>
                    <span>?</span>
                </div>
                <div className="options-container">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        // Only show reasonable options if needed, but for 0-10 sum, 0-10 options are okay
                        <button key={num} className="option-btn" onClick={() => handleAnswer(num)}>
                            {num}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="math-game-container">
            <Link to="/" className="back-btn">🏠 Back Home</Link>

            {!gameMode ? (
                <div className="menu">
                    <h1>🧩 Fun Math Game! 🧩</h1>
                    <p>Choose a game to play:</p>
                    <button className="mode-btn" onClick={() => setGameMode('counting')}>
                        🔢 Counting
                    </button>
                    <button className="mode-btn" onClick={() => setGameMode('addition')}>
                        ➕ Addition
                    </button>
                </div>
            ) : (
                <div className="game-board">
                    <div className="score-board">Score: {score} ⭐</div>
                    {gameMode === 'counting' ? renderCountingGame() : renderAdditionGame()}
                    <div className={`feedback ${showConfetti ? 'success' : ''}`}>{feedback}</div>
                    <button className="reset-btn" onClick={() => setGameMode(null)}>🔄 Change Game</button>
                </div>
            )}
        </div>
    );
};

export default MathGame;
