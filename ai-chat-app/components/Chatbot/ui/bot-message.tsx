import { Message } from '../chatbot';

export default function BotMessage({ content }: Message) {
  return (
    <div className='flex w-full my-2'>
      <div className='flex flex-col'>
        <div className='flex items-center gap-2 mb-1'>
          <div className='flex justify-center p-1 w-8 h-8 border bg-blue-800 rounded-full mr-2'>
            {/* Icon placeholder */}
          </div>
          <span className='text-xs text-green-400'>AI Assistant</span>
        </div>
        <div className='ml-10'>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
} 