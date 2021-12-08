import React from 'react';

function AboutModal() {
  return (
    <div className="aboutModal">
      <header>
        <h3>About Me</h3>
      </header>
      <section>
        <div className="row">
          <div className="col-md-6">
            <div className="aboutModalContent">
              <p>Innovative optimized solution seeker.</p>
              <p>
                Worked in Start-up post graduation primarily in E-commerce,
                Education & SAAS Domain.
              </p>
              <p>Seek perfection in products & pixel perfection interface. </p>
              <p>
                Always look forward to learn and go beyond my comfort zone to
                own up and get things done.
              </p>
              <div style={{ marginBottom: '20px' }}>
                <h4>Skills:</h4>
              </div>
              <ul className="list-inline">
                <li>
                  <img
                    src={process.env.PUBLIC_URL + '/html5.png'}
                    alt="html logo"
                    title="HTML5"
                  />
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + '/CSS3.svg'}
                    alt="css logo"
                    title="CSS3"
                  />
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + '/js.png'}
                    alt="JS logo"
                    title="JavaScript"
                  />
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + '/sketch.png'}
                    alt="Sketch logo"
                    title="Sketch UI Design"
                  />
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + '/react.png'}
                    alt="React logo"
                    title="React"
                  />
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + '/vue.png'}
                    alt="Vue logo"
                    title="Vue"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="aboutModalImg">
              <img
                src={process.env.PUBLIC_URL + '/myself.png'}
                alt="Art"
                height="350"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutModal;
