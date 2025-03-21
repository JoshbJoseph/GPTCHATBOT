import { Message } from '../chatbot';

/**
 * UserMessage Component
 * Displays messages from the user with distinct styling
 * @param {Message} props - Message content and role
 * @returns {JSX.Element} Styled user message component
 */
export default function UserMessage({ content }: Message) {
    return (
        <div className='flex w-full my-2'>
            <div className='flex flex-col max-w-full'>
                <div className='flex items-center gap-2 mb-1'>
                    <div className='flex-shrink-0 flex justify-center p-1 w-8 h-8 border border-blue-500 bg-blue-800 rounded-full mr-2'>
                       
                    </div>
                    <span className='text-xs text-blue-400'>You:</span>
                </div>
                <div className='ml-10 break-words overflow-wrap-anywhere bg-blue-900/20 p-3 rounded-lg border border-blue-500/50'>
                    <p className='whitespace-pre-wrap text-blue-400'>{content}</p>
                </div>
            </div>
        </div>
    ) 
}