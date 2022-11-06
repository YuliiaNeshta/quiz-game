import React, { useState } from 'react';
import './App.scss';
import Game from '../pages/Game';
import Main from '../pages/Main';

function App() {
  const [startGame, setStartGame] = useState<boolean>(false);

  return <>{startGame ? <Game /> : <Main onClick={() => setStartGame(true)} />}</>;
}

export default App;
