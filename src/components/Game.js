import React, { useEffect, useState } from "react";

const ROWS = 25;
const COLS = 25;
const INITIAL_SNAKE = [{ row: 12, col: 12 }];
const INITIAL_DIRECTION = "RIGHT";
const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const Names = ['*Brian', '*Thomas'  ,'*Choo Choo Astoria Alenda','*Arthur','*Avila']
 
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


  return {
    row: Math.floor(Math.random() * ROWS),
    col: Math.floor(Math.random() * COLS),
    
    foodSnake: foodSnake,
  };
};


const Game = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
 
  const [gameOver, setGameOver] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(null)
  
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

  const resetGame = () => {
    setLevel(null);
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setFood(generateFood(level));
  };
    
  useEffect(()=>{
    if (!gameOver && !isPause){
    if (level !==null){
      setFood(generateFood(level))
    }}
  },[level,gameOver,isPause])

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

      const gameInterval = setInterval(moveSnake, 100);

      return () => {
        clearInterval(gameInterval);
      };
    }
  }, [snake, direction, food, gameOver, isPause, score ,level]);

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
    <div>
      <h1> Adrian & Snake</h1>
      <div className="game-board">
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: COLS }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${snake.some(
                  (segment) => segment.row === rowIndex && segment.col === colIndex
                ) ? 'snake' : ''} ${food.row === rowIndex && food.col === colIndex ? 'food' : ''}`}
              >  {food.row === rowIndex && food.col === colIndex && food.foodSnake}
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
      <div className="start__btns">
        <button className="button" onClick={()=>setLevel('1')}>level 1</button>
        <button className="button" onClick={()=>setLevel('2')}>level 2</button>
        <button className="button" onClick={()=>setLevel('3')}>level 3</button>
      </div>
      {gameOver && (
        <div className='dialog'>
          <div className='reset'>
            <p>Oops Adrian Game over! <b>Your Score 🐍 {score}</b></p>
            <button onClick={resetGame}>Restart</button>
          </div>
        </div>
      )}
      <div className='control'>
        <button onClick={() => { setIsPause(!isPause) }}> {isPause ? 'Resume' : 'Pause'}</button>
        <p> Score : 🚀 {score}</p>
        <div className='button'>
          <button className="up" onClick={() => setDirection('UP')} >↑</button><br />
          <button className="left" onClick={() => setDirection('LEFT')} >←</button>
          <button className="right" onClick={() => setDirection('RIGHT')}>→</button><br />
          <button className="down" onClick={() => setDirection('DOWN')}>↓</button>
        </div>
      </div>
    </div>
  );
};

export default Game;