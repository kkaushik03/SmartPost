import React, { useState } from "react";
import "./chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) {
      return;
    }

    // Add the user's message to the messages state
    setMessages([...messages, { text: input, sender: "user" }]);

    try {
      // Fetch the response from the API
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      // Add the bot's response to the messages state
      setMessages(prev => [...prev, { text: data.response, sender: "bot" }]);
    } catch (error) {
      // Handle any errors
      setMessages(prev => [...prev, { text: "Error fetching response.", sender: "bot" }]);
    }

    // Clear the input field
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