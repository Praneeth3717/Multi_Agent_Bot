import { useState, useEffect, useRef } from "react";
import axios from 'axios'

const ChatBox = () => {
  const getInitialMessages = () => {
    try {
      const storedMessages = sessionStorage.getItem("chatMessages");
      return storedMessages ? JSON.parse(storedMessages) : [{ text: "Hello! How can I assist you today?", sender: "bot" }];
    } catch (error) {
      console.error("Failed to parse messages from sessionStorage:", error);
      return [{ text: "Hello! How can I assist you today?", sender: "bot" }];
    }
  };

  const [messages, setMessages] = useState(getInitialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

const sendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMessage = { text: input, sender: "user" };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    const role = userData?.role || "support";

    const endpoint =
      role === "admin"
        ? "http://localhost:5000/agent/dashboard"
        : "http://localhost:5000/agent/support";

    const response = await axios.post(endpoint, {
      message: input,
    });

    const botResponse = {
      text: response.data || "No reply from server.",
      sender: "bot",
    };

    setMessages((prev) => [...prev, botResponse]);
  } catch (error) {
    console.error("Error sending message to backend:", error);
    setMessages((prev) => [
      ...prev,
      { text: "Server error. Please try again later.", sender: "bot" },
    ]);
  }
};


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    try {
      sessionStorage.setItem("chatMessages", JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to sessionStorage:", error);
    }
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 bg-white shadow-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white shadow-md">
        <h3 className="font-semibold text-lg">Support Chat</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-gray-100 to-white space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-4 py-2 rounded-xl text-sm break-words ${
              msg.sender === "user"
                ? "ml-auto bg-blue-600 text-white shadow-md rounded-br-none"
                : "mr-auto bg-gray-200 text-gray-800 shadow-sm rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="flex items-center gap-2 border-t border-gray-200 p-3 bg-white"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow transition duration-200 ease-in-out transform hover:scale-105"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
