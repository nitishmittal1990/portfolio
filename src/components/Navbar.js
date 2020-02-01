import React from 'react';
import ReactModal from "react-modal";



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
        return <div>About</div>;
    }
    if (this.state.modalType === "project") {
    return <div>Project</div>;
    }
    if (this.state.modalType === "contact") {
    return <div>Contact</div>;
    }
    return (
        <div></div>
    );
  }

  render() {
    return (
      <div>
        <nav>
          <ul className="nav">
            <li onClick={this.handleOpenModal} id="about">
              About Me
            </li>
            <li onClick={this.handleOpenModal} id="project">
              Projects
            </li>
            <li onClick={this.handleOpenModal} id="contact">
              Contact Me
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
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
          {this.renderContent()}
        </ReactModal>
      </div>
    );
  }
}

export default Navbar;