import React from 'react';
import ReactModal from "react-modal";

import Navbar from './components/Navbar.js';
import Game from './components/Game.js'

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isGameStarted: false,
      showRuleModal: false,
      GameOver: false,
      score: 0,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleGameStatus = this.handleGameStatus.bind(this);
  }

  handleOpenModal(e) {
    this.setState({
      showRuleModal: true,
      modalType: e.target.id
    });
  }

  handleGameStatus() {
    this.handleCloseModal();
    this.setState({ isGameStarted: true});
  }

  handleCloseModal() {
    this.setState({ showRuleModal: false });
  }

  isGameOver = (datafromchild) => {
    if(datafromchild.isGameOver === false) {
      this.setState({
        isGameStarted: false,
        GameOver: true,
        score: datafromchild.score
      });
    }
  }


  render() {
    return (
      <div className="App">
        <ul className='socialIcons'>
          <li><a href='https://dribbble.com/nitishmittal' target='_blank' rel='noopener noreferrer'><img src={process.env.PUBLIC_URL + "/dribbble.png"} alt='Dribbble logo' title='Dribbble' /></a></li>
          <li><a href='https://medium.com/@nitishmittal' target='_blank' rel='noopener noreferrer'><img src={process.env.PUBLIC_URL + "/medium.png"} alt='Medium logo' title='Medium' /></a></li>
          <li><a href='https://twitter.com/nitish_mittal19' target='_blank' rel='noopener noreferrer'><img src={process.env.PUBLIC_URL + "/twitter.png"} alt='Twitter logo' title='Twitter' /></a></li>
          <li><a href='https://github.com/nitishmittal1990/' target='_blank' rel='noopener noreferrer'><img src={process.env.PUBLIC_URL + "/github.png"} alt='Github logo' title='Github' /></a></li>
          
        </ul>
        <Navbar />
        <section className="App-section">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div className="GameWrap">
            {this.state.isGameStarted ? (
              <Game isGameOverCallback={this.isGameOver} />
            ) : null}
          </div>
          {this.state.isGameStarted ? null : (
            <div className="myInfo">
              {this.state.GameOver ? <><h1>Game Over</h1> <p>Your Score: {this.state.score}</p></> : <><h1>Nitish Mittal</h1>
              <div className='subtext'>i <em>design</em> &amp; <span>develop</span> 
              <div className='rotateText'>
                <span>WebApps</span>
                <span>Websites</span>
                <span>UI/UX</span>
                <span>Products</span>
              </div> </div></> }
              <button
                className="portfolioBtn"
                onClick={this.handleOpenModal}
                id="GameRule"
              >
                Fire Rocket
              </button>
            </div>
          )}
        </section>
        <ReactModal
          shouldCloseOnEsc
          isOpen={this.state.showRuleModal}
          appElement={document.getElementById("root")}
          onRequestClose={this.handleCloseModal}
          contentLabel="About Game Rules"
          shouldCloseOnOverlayClick={false}
        >
          <button onClick={this.handleCloseModal} className="Modal-close">
            X
          </button>
          <div className="rulesModal">
            <header>
              <h3>Rules</h3>
            </header>
            <section>
              <div className="row">
                <ol className="rulesList">
                  <li>Press Space to Fire.</li>
                  <li>Press Right & Left Key To Move Rocket.</li>
                  <li>If Any Obstacle Reaches To Rocket, Game Will Be Over.</li>
                  <li>For Killing Each Obstacle, You Get 10 points.</li>
                  <li>Disclaimer: Game Has Some Issue, Will Be Fixed Soon.</li>
                </ol>
              </div>
              <button onClick={this.handleGameStatus} id="StartGame">Start Game</button>
            </section>
          </div>
        </ReactModal>
      </div>
    );
  }
}
export default App;
