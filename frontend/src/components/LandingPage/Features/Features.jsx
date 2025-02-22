
import React from "react";
import "./features.css";
import Feature1 from "../../../assets/Features/Feature_1.png";
import Feature2 from "../../../assets/Features/Feature_2.png";

const Features = () => {
  return (
    <div id="features" className="featurecontainer">
      <div className="ZoneOne">
        <div className="feature-content">
          <div className="AiFeatureOne">
            <p>AI Features</p>
          </div>
          <div className="FeatureTitleOne">Title</div>
          <div className="FeatureDescriptionOne">Description</div>
          <div className="FeatureListOne">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        </div>
        <div className="ImageFeatureOne">
          <img src={Feature1} alt="Feature 1" />
        </div>
      </div>

      <div className="ZoneTwo">
        <div className="feature-content">
          <div className="AiFeatureTwo">
            <p>AI Features</p>
          </div>
          <div className="FeatureTitleTwo">Seamless Follow-up Questions</div>
          <div className="FeatureDescriptionTwo">
            Keeps The Conversation Flowing Naturally By Asking Relevant Follow-Up
            Questions.
          </div>
          <div className="FeatureListTwo">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        </div>
        <div className="ImageFeatureTwo">
          <img src={Feature2} alt="Feature 2" />
        </div>
      </div>
    </div>
  );
};

export default Features;
