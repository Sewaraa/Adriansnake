import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StrictMode } from 'react';
import { GameState } from './context/GameContext';
import { ModalState } from './context/Modalcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <StrictMode>
    <ModalState> 
      <GameState>
      <App />
    </GameState>
    </ModalState>


  </StrictMode>

);



