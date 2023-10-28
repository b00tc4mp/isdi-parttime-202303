"use client";

import { FormEvent } from 'react'
import { postEvent } from '@/utils';

const NewEventForm = () => {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const target = event.target as typeof event.target & {
            title: { value: string }
            date: { value: string }
            time: { value: string }
            location: { value: string }
            text: { value: string }
            link1: { value: string }
            link2: { value: string }
        }


        const title = target.title.value;
        const date = target.date.value;
        const time = target.time.value;
        const location = target.location.value;
        const text = target.text.value;
        const link1 = target.link1.value;
        const link2 = target.link2.value;
        const eventDate = date+'T'+time;
        console.log(`${title} ${eventDate} ${location} ${text} ${link1} ${link2}`);

        await postEvent(title,eventDate,location,text,link1,link2);
    }
    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-2xl p-4 bg-blue-100">New Event</h1>
                <div className='p-8 justify-center items-center h-fit w-auto flex'>
                    <form className='flex flex-col gap-6 w-full justify-center justify-items-center' onSubmit={onSubmit}>
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 title' id='title' type='text' aria-label='title' placeholder='Title' />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 date' id='date' type='date' aria-label='date' placeholder='Date' />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 time' id='time' type='time' aria-label='time' placeholder='Time' />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 location' id='location' type='text' aria-label='location' placeholder='Location' />
                        <textarea className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 text' id='text' aria-label='text' placeholder='Text' />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 link1' id='link1' type='text' aria-label='link1' placeholder='Link' />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 link2' id='link2' type='text' aria-label='link2' placeholder='Link' />
                        <button className='bg-slate-700 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52' type='submit'>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewEventForm;
