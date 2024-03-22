import React, { useCallback, useEffect, useState } from "react";
import Snake from "./Snake";
import Letter from "./Letter";

const Game = () => {
  const getRandomGrid = () => {
    let min = 2;
    let max = 100;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  };

  const [food, setFood] = useState(getRandomGrid);
  const [speed] = useState(200);
  const [direction, setDirection] = useState('RIGHT');
  const [snakDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);

  const [reset] = useState(true);
  const [pause, setPause] = useState(true);

  const checkIfEat = useCallback((head) => {
    if (head[0] === food[0] && head[1] === food[1]) {
      return true;
    } else {
      return false;
    }
  }, [food]);

  const moveSnake = useCallback(() => {
   if (!direction) return;
    console.log(direction)
    let updatedSnake = [...snakDots];
    let head = [...updatedSnake[updatedSnake.length - 1]];
    switch (direction) {
      case "RIGHT":
        head[0] += 1;
        break;
      case "LEFT":
        head[0] -= 1;
        break;
      case "UP":
        head[1] -= 1;
        break;
      case "DOWN":
        head[1] += 1;
        break;
      default:
        break;
    }
    if (direction) {
      
      updatedSnake.push(head);
      checkIfEat(head) ? setFood(getRandomGrid()) : updatedSnake.shift();
    }
    
    setSnakeDots(updatedSnake);
   
  }, [checkIfEat, direction, snakDots]);
  useEffect(() => {
    const handleKeyDown = (event) => {
       switch (event.keyCode) {
       case 37:
       setDirection("LEFT");
       break;
       case 38:
       setDirection("UP");
       break;
       case 39:
       setDirection("RIGHT");
       break;
       case 40:
       setDirection("DOWN");
       break;
       default:
       break;
       }
       console.log(event.keyCode)
     };
     
    
       document.addEventListener("keydown", handleKeyDown);

 return () => {

 document.removeEventListener("keydown", handleKeyDown);
 };
  }, [direction,setDirection]);
  

  const onGameOver = useCallback(() => {
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setDirection(null);
    setPause(true);
  }, []);

  const checkIfOutside = useCallback(() => {
    let head = snakDots[snakDots.length - 1];
    if (
      head[0] >= 99||
      head[1] >= 99 ||
      head[0] < 0 ||
      head[1] < 0
    ) {
      onGameOver();
    }
  }, [snakDots,onGameOver]);

 

  const checkIfCollapsed = useCallback(() => {
    let snake = [...snakDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  }, [snakDots, onGameOver]);
 

  useEffect(() => {
    if (pause) return

    checkIfOutside();

    checkIfCollapsed();
    
    setTimeout(() => moveSnake(snakDots,checkIfEat), speed);
   
  }, [snakDots, pause, moveSnake, checkIfCollapsed, checkIfOutside, speed,checkIfEat]);

 

  return (
    <div className="container">
      <div className="game-container">
        <Snake snakDots={snakDots} />
        <Letter dot={food} />
      </div>
      <button className="btn btn-sm" onClick={()=> setPause((p)=>!p)}>
          {pause ?'play':'pause'}
        </button>
    </div>
  );
};

export default Game;