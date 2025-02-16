import React, { useState } from "react";
import "./chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const responses = {
    "hi": "Hello! How can I assist you?",
    "bye": "Goodbye! Have a great day!",
    "default": "I don't understand"
  };

  const sendMessage = () => {
    if (!input.trim()) {
      return;
    }
    
    setMessages([...messages, { text: input, sender: "user" }]);

    setTimeout(() => {
      const response = responses[input.toLowerCase()] || responses["default"];
      setMessages(prev => [...prev, { text: response, sender: "bot" }]);
    }, 500);

    setInput("");
  };

  return (
    <div id="chatbot" className="chatbot-container">
      <div className="chat-title">CodeTech Assistant</div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Message CodeTech..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
