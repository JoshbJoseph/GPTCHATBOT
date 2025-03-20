import {CiUser} from 'react-icons/ci';
import { Message } from '../chatbot';

export default function UserMessage({ content }: Message) {
    return (
        <div className='flex w-full my-2'>
            <div className='flex flex-col max-w-full'>
                <div className='flex items-center gap-2 mb-1'>
                    <div className='flex-shrink-0 flex justify-center p-1 w-8 h-8 border bg-slate-800 rounded-full mr-2'>
                        <CiUser size={18}/>
                    </div>
                    <span className='text-xs text-green-400'>You</span>
                </div>
                <div className='ml-10 break-words overflow-wrap-anywhere'>
                    <p className='whitespace-pre-wrap'>{content}</p>
                </div>
            </div>
        </div>
    ) 
}