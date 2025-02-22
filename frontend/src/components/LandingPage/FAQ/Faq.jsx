import React from "react";
import "./faq.css";
import { useState } from "react";

const faqData = [
  {
    question: "Question?",
    answer: "Bla bla bla",
  },
  {
    question: "Question?",
    answer: "Bla bla bla",
  },
  {
    question: "Question?",
    answer: "Bla bla bla",
  },
  {
    question: "Question?",
    answer: "Bla bla bla",
  },
  {
    question: "Question?",
    answer: "Bla bla bla",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-container">
      <h2>Everything You Need To Know</h2>

      <p className="faq-subtitle">Here Are Some Frequently Asked Questions</p>

      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <span className="faq-number">{`0${index + 1}`}</span>
              <span className="faq-text">{faq.question}</span>
              <span className="faq-icon">
                {openIndex === index ? "↓" : "↗"}
              </span>
            </button>

            {openIndex == index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;

// ↓ ↗
