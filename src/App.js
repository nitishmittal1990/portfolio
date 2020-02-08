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
      showRuleModal: false
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

  render() {
    return (
      <div className="App">
        <Navbar />
        <section className="App-section">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div className="GameWrap">
            {this.state.isGameStarted?<Game />:null}
          </div>
          {this.state.isGameStarted? null: 
          <div className="myInfo">
            <h1>Nitish Mittal</h1>
            <p>Full Stack Developer</p>
            <button
              className="portfolioBtn"
              onClick={this.handleOpenModal}
              id="GameRule"
            >
              Fire Rocket
            </button>
          </div>}
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
          <div>
            <header>
              <h3>Rules</h3>
            </header>
            <section>
              <div className="row"></div>
              <button onClick={this.handleGameStatus}>
                Start Game
              </button>
            </section>
          </div>
        </ReactModal>
      </div>
    );
  }
}
export default App;
