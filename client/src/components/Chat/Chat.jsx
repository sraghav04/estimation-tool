import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Chat.css";
import ChatResponseTable from "../Table/Table.jsx";
function Chat() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { type: "user", text: input };
    setChat((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8082/chat", {
        message: input,
      });
      const replyMessage = { type: "bot", text: res.data.reply };
      setChat((prev) => [...prev, replyMessage]);
    } catch (error) {
      console.log(error);
      setChat((prev) => [
        ...prev,
        { type: "bot", text: "Error fetching response." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="Chatbot">
      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">Bot is typing...</div>}
        <div ref={chatEndRef} />
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
