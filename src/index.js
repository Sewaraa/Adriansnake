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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

