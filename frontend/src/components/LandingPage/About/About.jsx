import React from "react";
import "./about.css";

const about = [
  {
    image: "khushi.jpg",
    title: "Khushi Kaushik",
    description:
      "I’m Khushi Kaushik, Project Manager at CodeTech, leading AI/ML efforts and soon pursuing my CS Master’s at UCSD.",
    linkedin: "https://www.linkedin.com/in/khushikaushik2506",
  },
  {
    image: "alyssa.jpg",
    title: "Alyssa Amancio",
    description:
      "I’m Khushi Kaushik, Project Manager at CodeTech, leading AI/ML efforts and soon pursuing my CS Master’s at UCSD.",
    linkedin: "https://www.linkedin.com/in/alyssa-amancio-860b08296/",
  }
  {
    image: "trang.jpg",
    title: "Trang Ngo",
    description:
      "Hi there! I'm Ngoc Nguyen, a CS senior student and proud woman in tech with a passion for problem-solving and innovation.",
    linkedin: "https://www.linkedin.com/in/trangn03/",
  },
  {
    image: "https://i.imgur.com/mhE0Hif.jpeg",
    title: "Ngoc Nguyen",
    description:
      "Hi there! I'm Ngoc Nguyen, a CS senior student and proud woman in tech with a passion for problem-solving and innovation.",
    linkedin: "https://www.linkedin.com/in/hnng1015/",
  },
];

const About = () => {
  return (
    <section id="about" className="about-container">
      <h2>About Us</h2>
      <div className="about-grid">
        {about.map((person, index) => (
          <div className="about-card" key={index}>
            <div className="about-image">
              <img src={person.image} alt={person.title} />
            </div>
            <div className="about-text">
              <h3>{person.title}</h3>
              <p>{person.description}</p>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
