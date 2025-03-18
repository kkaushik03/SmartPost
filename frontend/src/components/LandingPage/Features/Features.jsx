import React from "react";
import "./features.css";
import Feature1 from "../../../assets/Features/Feature_1.png";
import Feature2 from "../../../assets/Features/Feature_2.png";

const Features = () => {
  return (
    <section id="features" className="featurecontainer">
      <div className="ZoneOne">
        <div className="feature-content">
          <span className="AiFeatureOne">AI Features</span>
          <h2 className="FeatureTitleOne">Title</h2>
          <p className="FeatureDescriptionOne">Description</p>
          <ul className="FeatureListOne">
            <li>Feature</li>
            <li>Feature</li>
            <li>Feature</li>
          </ul>
        </div>
        <div className="ImageFeatureOne">
          <img src={Feature1} alt="Feature 1" />
        </div>
      </div>

      <div className="ZoneTwo">
        <div className="feature-content">
          <span className="AiFeatureTwo">AI Features</span>
          <h2 className="FeatureTitleTwo">Title</h2>
          <p className="FeatureDescriptionTwo">Description</p>
          <ul className="FeatureListTwo">
            <li>Feature</li>
            <li>Feature</li>
            <li>Feature</li>
          </ul>
        </div>
        <div className="ImageFeatureTwo">
          <img src={Feature2} alt="Feature 2" />
        </div>
      </div>
      
    </section>
  );
};

export default Features;