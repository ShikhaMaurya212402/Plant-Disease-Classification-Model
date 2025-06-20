import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import "./ChatbotWidget.css";

export default function ChatWindow({ messages, input, setInput, sendMessage }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">Farming Chatbot</div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} {...msg} />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <form
        className="chat-input-bar"
        onSubmit={e => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write your message here"
        />
        <button type="submit">➤</button>
      </form>
    </div>
  );
}