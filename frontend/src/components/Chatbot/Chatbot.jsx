import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
      const response = await fetch("https://codetech-k96i.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      const bot_reply = data.response.replace(/\n/g, "\n");
      console.log(bot_reply)

      // Add the bot's response to the messages state
      setMessages(prev => [...prev, { text: bot_reply, sender: "bot" }]);
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
            {msg.sender === "bot" ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
      </div>

      <div className="chat-holder">
        <textarea
          className="chat-input"
          placeholder="Message CodeTech..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // Allow the height of the chat when pasting the text
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;