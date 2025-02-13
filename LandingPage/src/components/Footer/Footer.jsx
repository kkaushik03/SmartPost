import React from 'react';
import "./footer.css";

const Footer = () => {
  return (
    <div className="footercontainer">
    <div className='CodeTechName'>
      <p>CodeTech</p>
    </div>
    <div className='ResourcesName'>
    <p>Resources</p>
    </div>
    <div className='ExploreName'>
      <p>Explore</p>
    </div>
    <div className='CompanyName'>
      <p>Company</p>
    </div>
    <div className='OthersName'>
      <p>Others</p>
    </div>

    <div className='CopyrightName'>
      <p>Copright © 2025.All rights reserved</p>
    </div>

    <div className='SocialsName'>
    <button>Socials</button>
    </div>

    <div>
    <button>CodeTech Community</button>
    </div>
      
    </div>
  )
}

export default Footer;