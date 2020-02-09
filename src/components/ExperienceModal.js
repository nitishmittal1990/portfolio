import React from "react";

function ExperienceModal() {
  return (
    <div className="experienceModal">
      <header>
        <h3>Experience</h3>
      </header>
      <section className='experienceContent'>
        <ul className="list-inline">
          <li>
            <div className='eximgwrap'><img src={process.env.PUBLIC_URL + "/grabon.png"} alt='logo' /></div>
            <h4>GrabOn</h4>
            <h5>Sr. UI/UX Developer</h5>
            <div className='experienceCard'>
              <ul>
                <li>
                  Lead performance oriented design with 3 members team for B2C
                  producr (grabon.in)
                </li>
                <li>
                  Learned and Implemented SEO best practices
                </li>
                <li>
                  Increased conversion rate by 20% through implementation of 
                  UX methodolgies  
                </li>
                <li>
                  Handled a blog development project end to end
                </li>
                <li>
                  Increased page speed score of site from 65 to 88
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ExperienceModal;
