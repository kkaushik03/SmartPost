import React from "react";
import "./faq.css";
import { useState } from "react";

const faqData = [
  {
    question: "What does this site do?",
    answer: "Codetech lets you upload your code files in accepted formats and automatically grades them on key criteria—Correctness, Efficiency, Readability, Style, Security, and Fragility. It provides a comprehensive, polished HTML report that offers actionable insights, streamlining the process of code review and elevating your development workflow.",
  },
  {
    question: "How does it work?",
    answer: "Once you upload your code, our system leverages an advanced large language model guided by a detailed prompt to evaluate your submission. The LLM assesses your code against the established criteria and generates a refined HTML report that highlights strengths, identifies issues, and offers practical recommendations for improvement.",
  },
  {
    question: "Is my code secure with CodeTech?",
    answer: "Yes, our secure file upload and validation process ensures your code is handled safely and confidentially.",
  },
  {
    question: "Why make this project?",
    answer: "Codetech revolutionizes code evaluation by automating reviews with cutting-edge AI. It rigorously grades code on correctness, efficiency, readability, style, security, and fragility—delivering detailed, actionable insights. This advanced solution accelerates development cycles, reduces costs, and guarantees software excellence. Invest in Codetech to empower your team and secure a competitive edge in the tech landscape.",
  },
  {
    question: "Who is it for?",
    answer: "Codetech is for developers, tech teams, and organizations determined to excel. Whether you’re a startup scaling rapidly or an established company ensuring quality, Codetech delivers precision-driven, actionable insights. Empower your team to write flawless code and secure a competitive edge in today’s fast-paced tech world.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-container">
      <h2>FAQs</h2>
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

            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
