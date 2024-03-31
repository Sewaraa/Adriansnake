import { useContext } from 'react';
import './App.css';
import Game from './components/Game';
import { GameContext } from './context/GameContext';
import Start from './components/Start';


function App() {
  const { screen } = useContext(GameContext)
  return (
    <div className="App">
    <div className='container'>{screen === "start" ? <Start /> : <Game/>}</div>
 
    </div>
  );
}

export default App;
