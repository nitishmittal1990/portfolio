import React, { useState } from 'react';
import ReactModal from 'react-modal';

import AboutModal from './AboutModal.js';
import ExperienceModal from './ExperienceModal.js';
import ProjectModal from './ProjectModal.js';

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (e) => {
    setShowModal(true);
    setModalType(e.target.id);
  };

  const handleCloseModal = (e) => {
    setShowModal(false);
  };

  const renderContent = () => {
    if (modalType === 'about') {
      return <AboutModal />;
    }
    if (modalType === 'project') {
      return <ProjectModal />;
    }
    // if (modalType === 'experience') {
    //   return <ExperienceModal />;
    // }
    return null;
  };

  return (
    <>
      <nav>
        <ul className="nav">
          <li onClick={handleOpenModal} id="about">
            About Me
          </li>
          <li onClick={handleOpenModal} id="project">
            Projects
          </li>
          <li>
            <a
              href="https://drive.google.com/file/d/1rh0lsuoxt7YtS6_AONcBBQLuGFHk5r76/view"
              title="Nitish Resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
      <ReactModal
        shouldCloseOnEsc
        isOpen={showModal}
        appElement={document.getElementById('root')}
        onRequestClose={handleCloseModal}
        contentLabel="About Us Modal"
        shouldCloseOnOverlayClick={false}
        className="myModalNitish"
      >
        <button onClick={handleCloseModal} className="Modal-close">
          X
        </button>
        {renderContent()}
      </ReactModal>
    </>
  );
}

export default Navbar;
