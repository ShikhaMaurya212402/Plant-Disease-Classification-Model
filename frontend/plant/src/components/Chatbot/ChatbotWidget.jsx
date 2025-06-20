import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./ChatbotWidget.css";

const GEMINI_API_KEY = "your_gemini_api_key_here"; // Replace with your actual Gemini API key
const systemPrompt = `
You are an expert farming assistant.
- Only answer questions related to farming, plants, crops, pests, disease, soil, weather for agriculture, fertilizers, or gardening.
- Never answer off-topic questions; if asked, politely refuse and restate your focus.
- Be concise, friendly, non-repetitive, and never go off-topic.
- If your response is long or has multiple points, use plain text bullet points (with hyphens or numbers, not asterisks or markdown).
- Do NOT use any markdown formatting (no *, **, #, etc). Just plain text.
- Keep responses as short and direct as possible. Only provide essential information. Explain only if asked.
- Do not repeat information.
`;

async function fetchGemini(messages) {
  const parts = [{ text: systemPrompt }];
  messages.forEach(msg => {
    parts.push({ text: `${msg.role === "user" ? "User" : "Bot"}: ${msg.text}` });
  });
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts }] }),
    }
  );
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no response.";
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "👩‍🌾 Hi! Ask me anything about farming, crops, pests, soil, or gardening." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async (userText) => {
    if (!userText.trim()) return;
    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setInput("");
    setMessages(msgs => [...msgs, { role: "bot", text: "Typing..." }]);
    const botReply = await fetchGemini(newMessages);
    setMessages(msgs =>
      msgs.slice(0, -1).concat({ role: "bot", text: botReply })
    );
  };

  return (
    <>
      <button className="chatbot-toggle-btn" onClick={() => setOpen(o => !o)}>
        💬
      </button>
      {open && (
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      )}
    </>
  );
}