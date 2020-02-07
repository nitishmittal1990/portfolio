import React from 'react';

import Navbar from './components/Navbar.js';
import Game from './components/Game.js'

import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar />
      <section className="App-section">
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <div className='myInfo'>
            <h1>Nitish Mittal</h1>
            <p>Full Stack Developer</p>
            <button className='portfolioBtn'>Fire Rocket</button>
        </div>
        <div className="GameWrap">
          <Game />
        </div>
      </section>
    </div>
  );
}

export default App;
