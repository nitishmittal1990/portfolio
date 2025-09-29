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
        <br />
        <div className="row">
          <div className="col-md-7">
            <div className="videoWrap">
              <img src={process.env.PUBLIC_URL + "/codeceptui.png"} alt='codecept ui' />
            </div>
          </div>
          <div className="col-md-5">
            <div className="projectHead">
              <h4>Codecept UI </h4>
              <p>
                E2E Testing Framework
              </p>
              <p>
                I contributed to the open source Codecept UI project.
              </p>
              <div>
                <p className="tech-used">Technology Used:</p>
                <img src={process.env.PUBLIC_URL + "/vue.png"} alt='vue' height='50'/>
              </div>
              <a href="https://codecept.io/ui/" target="_blank" rel="noopener noreferrer">Codecept UI</a>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-7">
            <div className="videoWrap">
              <img src={process.env.PUBLIC_URL + "/solar.png"} alt='Solar System' />
            </div>
          </div>
          <div className="col-md-5">
            <div className="projectHead">
              <h4>Solar System</h4>
              <p>
                Created a solar system using Three.js
              </p>
              <p>
                This is still work in progress.
              </p>
              {/* <div>
                <p>Technology Used:</p>
                <img src={process.env.PUBLIC_URL + "/vue.png"} alt='vue' height='50'/>
              </div> */}
              <a href="https://solar-3d.netlify.app/" target="_blank" rel="noopener noreferrer">3D Solar System</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectModal;
