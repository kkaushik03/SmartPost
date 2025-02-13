import React from 'react';
import "./about.css";

const about = [
  {
    icon: "😀",
    title: "title",
    description: "Description",
  },
  {
    icon: "😀",
    title: "title",
    description: "Description",
  },
  {
    icon: "😀",
    title: "title",
    description: "Description",
  },
  {
    icon: "😀",
    title: "title",
    description: "Description",
  },
  {
    icon: "😀",
    title: "title",
    description: "Description",
  },
  {
    icon: "😀",
    title: "title",
    description: "Description",
  },
]

const About = () => {
  return (
    <section className="about-container">
      <h2> Instant Content Generation with AI</h2>
      <p className="about-subtitle">
        Provide descriptions, Get instant AI Generated Content
      </p>

      <div className="about-grid">
        {about.map((about, index) => (
          <div className="about-card" key={index}>
            <span className="about-icon">{about.icon}</span>
            <h3>{about.title}</h3>
            <p>{about.description}</p>
          </div>
      
        ))}
      
      </div>

    </section>
  )
}

export default About;