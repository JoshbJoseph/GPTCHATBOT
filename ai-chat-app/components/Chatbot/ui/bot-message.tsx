import { Message } from '../chatbot';

/**
 * BotMessage Component
 * Displays messages from the AI assistant with distinct styling
 * @param {Message} props - Message content and role
 * @returns {JSX.Element} Styled bot message component
 */
export default function BotMessage({ content }: Message) {
  return (
    <div className='flex w-full my-2'>
      <div className='flex flex-col max-w-full'>
        <div className='flex items-center gap-2 mb-1'>
          <span className='text-xs text-blue-400'>AI Assistant:</span>
        </div>
        <div className='break-words overflow-wrap-anywhere bg-blue-900/20 p-3 rounded-lg border border-blue-500/50'>
          <p className='whitespace-pre-wrap text-blue-400'>{content}</p>
        </div>
      </div>
    </div>
  );
} 