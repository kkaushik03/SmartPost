import React from 'react';
import "./features.css";

const Features = () => {
  return (
    <div className="feature-container">
      <div className="ZoneOne">
        <div className='AiFeatureOne'>
          <p>AI Features</p>
        </div>
        <div className='FeatureTitleOne'>
          Title
        </div>
        <div className='FeatureDescriptionOne'>
          Description
        </div>
        <div className='FeatureListOne'>
          <ul>
            <li>Feature 1</li>  
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
          
        
        <div className='ImageFeatureOne'>
          <p>image</p>
        </div>
      </div>

      <div className="ZoneTwo">
        <div className='AiFeatureTwo'>
          <p>AI Features</p>
        </div>
        <div className='FeatureTitleTwo'>
          Seamless Follow-up Questions
        </div>
        <div className='FeatureDescriptionTwo'>
            Keeps The Conversation Flowing Naturally By Asking Relevant Follow-Up Questions.
        </div>
        <div className='FeatureListTwo'>
          <ul>
            <li>Feature 1</li>  
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
          
        
        <div className='ImageFeatureTwo'>
          <p>image</p>
        </div>
      </div>
    </div>
    
  )
}

export default Features;