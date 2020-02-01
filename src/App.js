import React from 'react';

import Navbar from './components/Navbar.js'
import './App.css';

/**

** 1.    Complete the Front - Page theme
** 2.    Put Static Content Placeholder
** 3.    Put Navigation
** 4.    Do all the above for mobile

*/


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
      </section>
    </div>
  );
}

export default App;
