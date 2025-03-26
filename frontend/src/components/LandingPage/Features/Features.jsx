import React from "react";
import "./features.css";
import Feature1 from "../../../assets/Features/Feature_1.png";
import Feature2 from "../../../assets/Features/Feature_2.png";

const Features = () => {
  return (
    <section id="features" className="featurecontainer">
      <div className="ZoneOne">
        <div className="feature-content">
          {/* <span className="AiFeatureOne">AI Features</span> */}
          <h2 className="FeatureTitleOne">Automated Code Grading</h2>
          <ul className="FeatureListOne">
            <li>Assesses code on critical metrics: Correctness, Efficiency, Readability, Style, Security, and Fragility</li>
            <li>Produces a sleek, professional HTML report with clear letter grades and actionable insights</li>
            <li>Empowers rapid improvements and maintains high-quality code standards</li>
          </ul>
        </div>
        <div className="ImageFeatureOne">
          <img src={Feature1} alt="Feature 1" />
        </div>
      </div>

      <div className="ZoneTwo">
        <div className="feature-content">
          {/* <span className="AiFeatureTwo">AI Features</span> */}
          <h2 className="FeatureTitleTwo">Seamless File Upload & Validation</h2>
          <ul className="FeatureListTwo">
            <li>Accepts multiple file formats with robust validation</li>
            <li>Provides instant, clear feedback for unsupported or missing files</li>
            <li>Built on a production-grade framework for reliability and smooth performance</li>
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