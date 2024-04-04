import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";

const ROWS = 25;
const COLS = 25;
const INITIAL_SNAKE = [{ row: 12, col: 12 }];
const INITIAL_DIRECTION = "RIGHT";
const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const Names = ['Brian', 'Thomas', 'Choo Choo ', 'Astoria', ' Alenda', 'Arthur', 'Avila']




const Game = () => {
  const { level, setScreen } = useContext(GameContext);
  const generateFood = (level) => {

    let randomIndex;
    let foodSnake;
    switch (level) {
      case '1':
        randomIndex = Math.floor(Math.random() * ALPHABET.length);
        foodSnake = ALPHABET[randomIndex]
        break;
      case '2':
        randomIndex = Math.floor(Math.random() * Numbers.length);
        foodSnake = Numbers[randomIndex]
        break;
      case '3':
        randomIndex = Math.floor(Math.random() * Names.length);
        foodSnake = Names[randomIndex]
        break;
      default:
        foodSnake = "";

    }

    if (level === '3') {
      return {
        row: Math.floor(Math.random() * 20),
        col: Math.floor(Math.random() * 20),

        foodSnake: foodSnake,

      };
    }
    else {
      return {
        row: Math.floor(Math.random() * 23),
        col: Math.floor(Math.random() * 23),

        foodSnake: foodSnake,
      };
    }

  };
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);

  const [gameOver, setGameOver] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [score, setScore] = useState(0);

  const [food, setFood] = useState(generateFood(level));


  const checkCollision = (snake) => {
    const head = snake[0];
    return (
      snake.slice(1).some((segment) => segment.row === head.row && segment.col === head.col) ||
      head.row < 0 ||
      head.row >= ROWS ||
      head.col < 0 ||
      head.col >= COLS
    );
  };
  const handleQuit = () => {
    setScreen("start")
  }

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setFood(generateFood(level));
  };

  useEffect(() => {

    if (level !== null) {
      setFood(generateFood(level))
    }
  }, [level])

  useEffect(() => {
    if (!gameOver && !isPause) {

      const moveSnake = () => {
        const newSnake = snake.map((segment) => ({ ...segment }));

        const head = { ...newSnake[0] };

        switch (direction) {
          case "UP":
            head.row = (head.row - 1 + ROWS) % ROWS;
            break;
          case "DOWN":
            head.row = (head.row + 1) % ROWS;
            break;
          case "LEFT":
            head.col = (head.col - 1 + COLS) % COLS;
            break;
          case "RIGHT":
            head.col = (head.col + 1) % COLS;
            break;
          default:
            break;
        }

        newSnake.unshift(head);

        if (head.row === food.row && head.col === food.col) {
          setFood(generateFood(level));
          setScore(score + 10);
        } else {
          newSnake.pop();
        }

        if (checkCollision(newSnake)) {
          setGameOver(true);
        } else {
          setSnake(newSnake);
        }
      };

      const gameInterval = setInterval(moveSnake, 150);

      return () => {
        clearInterval(gameInterval);
      };
    }
  }, [snake, direction, food, gameOver, isPause, score, level]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection("UP");
          break;
        case "ArrowDown":
          setDirection("DOWN");
          break;
        case "ArrowLeft":
          setDirection("LEFT");
          break;
        case "ArrowRight":
          setDirection("RIGHT");
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div >
      <h1> Adrian & Snake</h1>
      <div className="header">
        
        <div className="onoff" onClick={() => { setIsPause(!isPause) }}>
          {isPause ? (
            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
              </g><g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.04995 2.74995C3.04995 2.44619 2.80371 2.19995 2.49995 2.19995C2.19619 2.19995 1.94995 2.44619 1.94995 2.74995V12.25C1.94995 12.5537 2.19619 12.8 2.49995 12.8C2.80371 12.8 3.04995 12.5537 3.04995 12.25V2.74995ZM5.73333 2.30776C5.57835 2.22596 5.39185 2.23127 5.24177 2.32176C5.0917 2.41225 4.99995 2.57471 4.99995 2.74995V12.25C4.99995 12.4252 5.0917 12.5877 5.24177 12.6781C5.39185 12.7686 5.57835 12.7739 5.73333 12.6921L14.7333 7.94214C14.8973 7.85559 15 7.68539 15 7.49995C15 7.31452 14.8973 7.14431 14.7333 7.05776L5.73333 2.30776ZM5.99995 11.4207V3.5792L13.4287 7.49995L5.99995 11.4207Z" fill="#128c89"></path>
              </g></svg>


          ) : (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Media / Pause_Circle">
                  <path id="Vector" d="M14 9V15M10 9V15M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke=" #128c89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </g>
            </svg>
          )}
        </div>
        <p> Score : 🚀 {score}</p>
      </div>

      <div className="game-board">
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: COLS }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`cell  ${snake.some(
                  (segment) => segment.row === rowIndex && segment.col === colIndex && segment === snake[0] && (direction === 'LEFT' || direction === 'RIGHT')
                ) ? 'snake_headlEFT' : ''}
                ${snake.some(
                  (segment) => segment.row === rowIndex && segment.col === colIndex && segment === snake[0] && (direction === 'UP' || direction === 'DOWN')
                ) ? 'snake_headuP' : ''}
               
                ${snake.some(
                  (segment) => segment.row === rowIndex && segment.col === colIndex && segment !== snake[0]
                ) ? 'snake' : ''}
                
                ${food.row === rowIndex && food.col === colIndex ? 'food' : ''}
               
               `}

              >
                {food.row === rowIndex && food.col === colIndex && food.foodSnake}
                {snake.some(
                  (segment) => segment.row === rowIndex && segment.col === colIndex && segment.foodSnake
                )
                  ? snake.find(
                    (segment) =>
                      segment.row === rowIndex && segment.col === colIndex
                  ).foodSnake
                  : ""}
              </div>
            ))}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className='modal'>
          <div className='modal_content'>
            <h2>Oops Adrian Game over! </h2>
            <h2>Your Score 🐍 {score}</h2>
            <div className="resequi">
              <button  className="btn"onClick={() => resetGame()}>Restart</button>
              <button className="btn" onClick={() => handleQuit()} >Quit</button>
            </div>

          </div>
        </div>
      )}
      <div className='control'>



        <div className="arrow" onClick={() => setDirection('UP')} ><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 11L12 8M12 8L9 11M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke=" #128c89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div><br />
        <div className="arrow" onClick={() => setDirection('LEFT')}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 9L8 12M8 12L11 15M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke=" #128c89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
        <div className="arrow" onClick={() => setDirection('RIGHT')}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke=" #128c89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div><br />
        <div className="arrow" onClick={() => setDirection('DOWN')}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 13L12 16M12 16L15 13M12 16V8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke=" #128c89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>

      </div>
    </div>
  );
};

export default Game;