import React from 'react';
import ReactModal from "react-modal";

import AboutModal from './AboutModal.js';
import ExperienceModal from './ExperienceModal.js';
import ProjectModal from "./ProjectModal.js";


class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      modalType: ''
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  handleOpenModal(e) {
    this.setState({ 
        showModal: true,
        modalType: e.target.id
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  renderContent() {
    if(this.state.modalType === 'about') {
        return <AboutModal />;
    }
    if (this.state.modalType === "project") {
        return <ProjectModal />;
    }
    if (this.state.modalType === "experience") {
        return <ExperienceModal />;
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <nav>
          <ul className="nav">
            <li onClick={this.handleOpenModal} id="about">
              About Me
            </li>
            <li onClick={this.handleOpenModal} id="project">
              Projects
            </li>
            <li onClick={this.handleOpenModal} id="experience">
              Experience
            </li>
          </ul>
        </nav>
        <ReactModal
          shouldCloseOnEsc
          isOpen={this.state.showModal}
          appElement={document.getElementById("root")}
          onRequestClose={this.handleCloseModal}
          contentLabel="About Us Modal"
          shouldCloseOnOverlayClick={false}
          className="myModalNitish"
        >
          <button onClick={this.handleCloseModal} className='Modal-close'>X</button>
          {this.renderContent()}
        </ReactModal>
      </React.Fragment>
    );
  }
}

export default Navbar;