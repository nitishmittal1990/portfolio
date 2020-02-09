import React from "react";

function ProjectModal() {
  return (
    <div className="projectModal">
      <header>
        <h3>Projects</h3>
      </header>
      <section>
        <div className="row">
          <div className="col-md-7">
            <div className="videoWrap">
              <img src={process.env.PUBLIC_URL + "/snakerecording.gif"} alt='snake recording' />
            </div>
          </div>
          <div className="col-md-5">
            <div className="projectHead">
              <h4>Snake Game</h4>
              <p>
                Snake Game is built using React
              </p>
              <p>
                It has feature show score as well.
              </p>
              <p>
                If you hit the wall game will be ended.
              </p>
              <div>
                <p>Technology Used:</p>
                <img src={process.env.PUBLIC_URL + "/react.png"} alt='react' height='60'/>
              </div>
              <a href="https://nitishmittal1990.github.io/snakegame/" target="_blank" rel="noopener noreferrer">Play Game</a>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  );
}

export default ProjectModal;
