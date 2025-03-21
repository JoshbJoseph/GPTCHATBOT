import { FormEvent } from "react";

/**
 * Props interface for ChatInput component
 * @interface ChatProps
 * @property {string} userMessage - Current message in the input field
 * @property {function} setUserMessage - Function to update the message state
 * @property {function} handleSendMessage - Function to handle message submission
 */
type ChatProps = {
  userMessage: string;
  setUserMessage: (value: string) => void;
  handleSendMessage: (e: FormEvent) => void;
};

/**
 * ChatInput Component
 * Renders the input field and send button for the chat interface
 * @param {ChatProps} props - Component properties
 * @returns {JSX.Element} Chat input interface component
 */
export default function ChatInput({
  userMessage,
  setUserMessage,
  handleSendMessage,
}: ChatProps) {
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex items-center justify-center w-full p-2 bg-gray-800"
    >
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message here"
        className="flex h-10 w-full rounded-md border border-gray-700 px-3 text-sm text-black"
      />
      <button className="ml-2 p-2 bg-gray-700 text-white rounded-md">
        Send
      </button>
    </form>
  );
}