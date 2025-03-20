import { Message } from '../chatbot';

export default function BotMessage({ content }: Message) {
  return (
    <div className='flex w-full my-2'>
      <div className='flex justify-center p-1 w-8 h-8 border bg-blue-800 rounded-full mr-2'>
        {/* You can add an icon here if needed */}
      </div>

      <div>
        <p>{content}</p>
      </div>
    </div>
  );
} 