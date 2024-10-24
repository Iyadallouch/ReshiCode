import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./ChatBot.css";
import { ReactTyped } from "react-typed";

const requestBotMessage = async (lastMessage) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  try {
    const response = await axios.post(`${apiUrl}/chat`, {
      message: lastMessage,
    });
    console.log(response);

    return response.data.text;
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Sorry, there was an error.";
  }
};

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [botThinking, setBotThinking] = useState(false);

  const onSend = useCallback((message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        _id: uuidv4(),
        text: message,
        sender: "user",
        createdAt: new Date(),
      },
    ]);

    (async () => {
      setBotThinking(true);
      const botMessage = await requestBotMessage(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          _id: uuidv4(),
          text: botMessage,
          sender: "bot",
          createdAt: new Date(),
        },
      ]);
      setBotThinking(false);
    })();
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: uuidv4(),
        text: "Hello! I'm here to assist you with all your software development and IT needs.",
        sender: "bot",
        createdAt: new Date(),
      },
    ]);
  }, []);

  return (
    <div>
      <h1>Chatbot</h1>
      <div className="chat-window">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={msg.sender === "user" ? "user-message" : "bot-message"}
          >
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: msg.text
                  .replace(/"/g, '\\"')
                  .replace(/\n/g, "<br>") // Replace new lines with <br>
                  .replace(/```(.*?)```/gs, "<code>$1</code>") // Code blocks
                  .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"), // Bold text
              }}
            />
          </div>
        ))}

        {botThinking && (
          <div className="bot-thinking">
            <ReactTyped strings={["Bot is thinking..."]} typeSpeed={40} />
          </div>
        )}
      </div>
      <div className="message-input">
        <input
          type="text"
          id="message"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value) {
              onSend(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.getElementById("message");
            if (input.value) {
              onSend(input.value);
              input.value = "";
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
