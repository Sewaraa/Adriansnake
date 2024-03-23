import React from "react";
import Game from "./Game";
const Start = () => {
    const handlelevel=(level)=>{
  
    }
    return (
        <div className="game-board">
            <div className="start__btns">
                <button className="btn" onClick={() => handlelevel("level1")}>level 1</button>
                <button className="btn" onClick={() => handlelevel("level2")}>level 2</button>
                <button className="btn" onClick={() => handlelevel("level3")}>level 3</button>
            </div>
        </div>
    );
}
export default Start;