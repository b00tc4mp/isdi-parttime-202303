"use client";

import { EventProps } from "@/types";
import { CalendarDay } from ".";
import { useRouter } from 'next/navigation'
import { deleteEvent } from "@/utils";

interface EventProp {
    evento: EventProps
}
const Event = ({ evento }: EventProp) => {
    const router = useRouter();

    const {_id, title, eventDate, location, text, links } = evento;

    const dateToDate = new Date(eventDate);

    const eventDay={
        day: dateToDate.toLocaleString('ES-es',{weekday:'long'}),
        month: dateToDate.toLocaleString('ES-es',{month:'long'}),
        dayNumber: dateToDate.getDate()
    }

    async function handleDelete(){
        await deleteEvent(_id);
        router.push('/events');
    }

    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-xl p-4 bg-slate-700 text-white">{title}</h1>
                <div className="flex flex-col xl:grid xl:grid-flow-row xl:grid-cols-2 xl:h-full items-center p-3">
                    <CalendarDay dayEvent={eventDay}/>
                    <div className="w-full p-6 justify-center flex flex-col gap-4">
                        <p className="text-justify whitespace-pre-line">{text}</p>
                        <p className="text-justify">{location}</p>
                        {
                            links.map((link) => (<a href="{link}">{link}</a>))
                        }
                    </div>
                    <div className="flex flex-row gap-3">
                        <button className='bg-slate-700 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md w-52' onClick={() => router.push('/events/edit/'+_id)}>
                            Edit
                        </button>
                        <button className='bg-red-300 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md w-52' onClick={handleDelete}>
                            Delete
                        </button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Event;