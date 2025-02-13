import React from 'react';
import "./hero.css";
import Ai_image from "../../assets/Hero/Ai-image.png";
import Credit_card from "../../assets/Hero/Credit_card.png";

const Hero = () => {
  return (
    
    <div className="hero-container">
      
      <div className='Title'>
        <h1> Title Description</h1>
      </div>
      
      <div className='TitleInfo'>
        <p>Your Personal AI, Tailored for Every Conversation, Anytime, Anywhere</p>
      </div>
      
      <div className='StartHere'>
        <button>START HERE FOR FREE</button>
      </div>
      
      <div className="hero-credit-card">
        <img src={Credit_card} alt = "Credit card" />
        <p className="credit-card-note"> No credit card required </p>
      </div>

      <div className="hero-ai_image">
          <img src={Ai_image} alt = "AI" />
      </div>
      

    </div>
  )
}

export default Hero;