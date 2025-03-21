"use client";
import { FormEvent, useState, useEffect } from "react";
import { TbMessageChatbot } from "react-icons/tb";
import BotMessage from "./ui/bot-message";
import UserMessage from "./ui/user-message";
import ChatInput from "./ui/chat-input";
import { chatCompletion } from "@/actions";

/**
 * Message type definition for chat interactions
 * @interface Message
 * @property {string} content - The content of the message
 * @property {"user" | "assistant" | "system"} role - The role of the message sender
 */
export type Message = {
  content: string;
  role: "user" | "assistant" | "system";
};

/**
 * LoadingDots Component
 * Displays an animated loading indicator with three bouncing dots
 * @returns {JSX.Element} Loading animation component
 */
const LoadingDots = () => (
  <div className="flex gap-1 items-center p-4 ml-10">
    <span className="text-xs text-green-400 mr-2">AI Assistant is typing</span>
    <div className="h-2 w-2 bg-green-500 rounded-full animate-[bounce_0.5s_infinite_-0.3s]"></div>
    <div className="h-2 w-2 bg-green-500 rounded-full animate-[bounce_0.5s_infinite_-0.15s]"></div>
    <div className="h-2 w-2 bg-green-500 rounded-full animate-[bounce_0.5s_infinite]"></div>
  </div>
);

/**
 * Main Chatbot Component
 * Handles the chat interface, message management, and API interactions
 * @returns {JSX.Element} Chatbot interface component
 */
export default function Chatbot() {
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello, how may I help you today?" },
  ]);

  /**
   * Handles sending messages and receiving responses
   * @param {FormEvent} e - Form submission event
   */
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setLoading(true);
    const newMessage: Message = { role: "user", content: userMessage };
    
    setMessages(prev => [...prev, newMessage]);
    setUserMessage("");

    try {
      const chatMessages = messages.slice(1);
      const res = await chatCompletion([...chatMessages, newMessage]);

      if (res?.content) {
        const assistantMessage: Message = {
          content: res.content as string,
          role: "assistant",
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Loading state changed:", loading); // Debug log
  }, [loading]);

  return (
    <div className="flex flex-col h-full bg-[#001a00]">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-800">
        {messages.map((m, i) => (
          m.role === "assistant" ? (
            <BotMessage {...m} key={i} />
          ) : (
            <UserMessage {...m} key={i} />
          )
        ))}
        {loading && <LoadingDots />}
      </div>
      <div className="border-t border-green-500/30">
        <ChatInput
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}