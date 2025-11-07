import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { IoSend } from "react-icons/io5";

const ChatBox = () => {
  const { userData } = useUserContext();

  const getInitialMessages = () => {
    try {
      const storedMessages = sessionStorage.getItem("chatMessages");
      return storedMessages
        ? JSON.parse(storedMessages)
        : [{ text: "Hello! How can I assist you today?", sender: "bot" }];
    } catch {
      return [{ text: "Hello! How can I assist you today?", sender: "bot" }];
    }
  };

  const [messages, setMessages] = useState(getInitialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { text: "Typing...", sender: "bot", isLoading: true },
    ]);

    try {
      const endpoint =
        userData?.role === "admin"
          ? "http://localhost:5000/agent/dashboard"
          : "http://localhost:5000/agent/support";

      const res = await axios.post(
        endpoint,
        { message: input },
        { withCredentials: true }
      );

      const botResponse = {
        text: res.data || "No reply from server.",
        sender: "bot",
      };

      // remove the loading message and add real response
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isLoading),
        botResponse,
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isLoading),
        { text: "Error contacting server.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(
    () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages]
  );

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 shadow-md border-l border-[#343540] bg-[#141414]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#000000] text-[#E1E1E1] border-b border-[#343540]">
        <h3 className="text-lg font-medium">Support Chat</h3>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#141414] space-y-3 custom-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${
              msg.isLoading ? "w-fit" : "max-w-[60%]"
            } px-4 py-2 rounded-xl text-sm break-words ${
              msg.sender === "user"
                ? "ml-auto bg-[#3C3C50] text-[#E1E1E1] rounded-br-none"
                : "mr-auto bg-[#343540] text-[#E1E1E1] rounded-bl-none"
            }`}
          >
            {msg.isLoading ? (
              <span className="flex items-center gap-1 justify-center h-5">
                <span className="w-1 h-1 bg-[#E1E1E1] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1 h-1 bg-[#E1E1E1] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1 h-1 bg-[#E1E1E1] rounded-full animate-bounce"></span>
              </span>
            ) : (
              msg.text
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="flex items-center gap-2 border-t border-[#343540] p-3 bg-[#0C0C0C]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 px-4 py-2 rounded-full bg-[#1E1E1E] text-[#FFFFFF] border border-[#343540] focus:ring-2 focus:ring-[#10A37F] focus:outline-none placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-[#10A37F] hover:bg-[#0E8F71] text-white px-4 py-2 rounded-full text-sm font-medium transition-transform transform hover:scale-105 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <IoSend className="text-lg" />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
