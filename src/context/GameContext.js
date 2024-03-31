import { createContext, useState} from "react";
const GameContext = createContext();

const GameState = (props) =>{
    const [screen, setScreen] = useState("start"); // start || game
    const[level,setLevel]=useState(null)
    const INITIAL_SNAKE = [{ row: 12, col: 12 }];
    const INITIAL_DIRECTION = "RIGHT";
    return (
        <GameContext.Provider
          value={{
            setScreen,
            screen,
            level,
            setLevel,
            INITIAL_SNAKE,
            INITIAL_DIRECTION,
           
          }}
        >
          {props.children}
        </GameContext.Provider>
      );
    };
    
    export { GameContext, GameState };
    