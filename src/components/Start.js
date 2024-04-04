import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import Welcome from "./Welcome";
import { ModalContext } from "../context/Modalcontext";
const Start =()=>{
    const {setLevel ,setScreen }=useContext(GameContext)
    const{ show }=useContext(ModalContext)
    const handlebutton = (level) => {
        setScreen('game')
        switch (level) {
          case '1':
            setLevel('1');
            break;
          case '2':
            setLevel('2');
            break;
          case '3':
            setLevel('3');
            break;
          default:
            break;
        }
      }
    return(
    
    <div >
        <h1> Adrian & Snake</h1> 
        <div className="game-board">
       {show === true ? <Welcome/>:""}
        <div className="levelbutton">
        <button className="btn " onClick={() => handlebutton('1')}>Letters</button>
        <button className="btn " onClick={() => handlebutton('2')}>Numbers</button>
        <button className="btn " onClick={() => handlebutton('3')}>Family</button>
      </div>
        </div>
    </div>)
}
export default Start;