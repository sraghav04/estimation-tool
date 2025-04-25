import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

function Chat() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { type: "user", text: input };
    setChat((prev) => [...prev, newMessage]);

    try {
      const res = await axios.post("http://localhost:8082/chat", {
        message: input,
      });

      const replyMessage = { type: "bot", text: res.data.reply };
      setChat((prev) => [...prev, replyMessage]);
    } catch (err) {
      console.error("Error:", err);
    }

    setInput("");
  };

  return (
    <div className="Chatbot">
      <h1>ChatGPT Chatbot</h1>
      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className={msg.type}>
            <strong>{msg.type === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
