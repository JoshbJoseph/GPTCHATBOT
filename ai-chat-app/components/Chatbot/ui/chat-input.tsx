import { FormEvent } from "react";

type ChatProps = {
  userMessage: string;
  setUserMessage: (value: string) => void;
  handleSendMessage: (e: FormEvent) => void;
};

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