"use client";
import { FormEvent, useState, useEffect } from "react";
import { TbMessageChatbot } from "react-icons/tb";
import BotMessage from "./ui/bot-message";
import UserMessage from "./ui/user-message";
import ChatInput from "./ui/chat-input";
import { chatCompletion } from "@/actions";

export type Message = {
  content: string;
  role: "user" | "assistant" | "system";
};

const LoadingDots = () => {
  useEffect(() => {
    console.log("LoadingDots component mounted");
  }, []);

  return (
    <div className="flex gap-1 items-center p-4 ml-10">
      <span className="text-xs text-green-400 mr-2">AI Assistant is typing</span>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default function Chatbot() {
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello, how may I help you today?" },
  ]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newMessage: Message = { role: "user", content: userMessage };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setUserMessage("");
    setLoading(true);
    console.log("Loading started:", loading); // Debug log

    try {
      const chatMessages = messages.slice(1);
      const res = await chatCompletion([...chatMessages, newMessage]);

      if (res?.content) {
        const assistantMessage: Message = {
          content: res.content as string,
          role: "assistant",
        };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
      console.log("Loading ended:", loading); // Debug log
    }
  };

  useEffect(() => {
    console.log("Loading state changed:", loading); // Debug log
  }, [loading]);

  return (
    <div className="flex flex-col h-full bg-[#001a00] text-green-500 font-mono">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m, i) => (
          m.role === "assistant" ? (
            <BotMessage {...m} key={i} />
          ) : (
            <UserMessage {...m} key={i} />
          )
        ))}
        {loading && <LoadingDots />}
      </div>
      <ChatInput
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}