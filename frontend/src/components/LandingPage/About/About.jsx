import React from "react";
import "./about.css";
import Alyssa from "../../../assets/About/Alyssa.png";
import Trang from "../../../assets/About/Trang.png";
import { FaLinkedin, FaGithub, FaEnvelope  } from "react-icons/fa";

const about = [
  {
    image: "khushi.jpg",
    title: "Khushi Kaushik",
    description:
      "I’m Khushi Kaushik, Project Manager at CodeTech, leading AI/ML efforts and soon pursuing my CS Master’s at UCSD.",
    linkedin: "https://www.linkedin.com/in/khushikaushik2506",
    github: "https://github.com/kkaushik03",
    email: "mailto:Khushi.kaushik.2506@gmail.com",
  },
  {
    image: Alyssa,
    title: "Alyssa Amancio",
    description:
      "Hello! My name is Alyssa Amancio, I have in interest in web design and desire to pursue it through front-end engineering.",
    linkedin: "https://www.linkedin.com/in/alyssa-amancio-860b08296/",
    github: "https://github.com/allyfaith",
    email: "mailto:aeamancio@csu.fullerton.edu",
  },
  {
    image: Trang,
    title: "Trang Ngo",
    description:
      "Hi there, I'm Trang Ngo. I'm enthusiastic about expanding my skills in web development, data analysis, and cloud security.",
    linkedin: "https://www.linkedin.com/in/trangn03/",
    github: "https://github.com/trangn03",
    email: "mailto:xtrang0201@gmail.com",
  },
  {
    image: "https://i.imgur.com/mhE0Hif.jpeg",
    title: "Ngoc Nguyen",
    description:
      "Hi there! I'm Ngoc Nguyen, a CS senior student and proud woman in tech with a passion for problem-solving and innovation.",
    linkedin: "https://www.linkedin.com/in/hnng1015/",
    github: "https://github.com/rubynguyen1510",
    email: "mailto:",
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

              <div className="social-links">
                <a 
                  href={person.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn profile of ${person.title}`}
                >
                  <FaLinkedin size={24} />
                </a>
                <a 
                  href={person.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`GitHub profile of ${person.title}`}
                >
                  <FaGithub size={24} />
                </a>
                <a 
                  href={person.email} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Email of ${person.title}`}
                >
                  <FaEnvelope size={24} />
                </a>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
