import React from "react";
export default function MessageBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`bubble-row ${isUser ? "bubble-row-user" : "bubble-row-bot"}`}>
      <div className={`bubble ${isUser ? "bubble-user" : "bubble-bot"}`}>
        {!isUser && <span className="avatar">🤖</span>}
        {isUser && <span className="avatar">🧑</span>}
        <span>{text}</span>
      </div>
    </div>
  );
}