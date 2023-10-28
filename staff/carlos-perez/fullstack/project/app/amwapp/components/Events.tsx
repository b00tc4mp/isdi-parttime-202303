"use client";

import { EventProps } from "@/types";
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { CalendarDay } from ".";

interface EventProp {
    evento: EventProps;
}
const Events = ({ evento }: EventProp) => {

    const { _id, title, eventDate } = evento;


    const router = useRouter()

    const enroute = (route: string) => {
        router.push(route);
    }

    const [clickedButton, setClickedButton] = useState('');

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const button: HTMLButtonElement = event.currentTarget;
        setClickedButton(button.name);
        enroute(`/events/${button.name}`);
    };

    const dateToDate = new Date(eventDate);

    const eventDay = {
        day: dateToDate.toLocaleString('ES-es', { weekday: 'long' }),
        month: dateToDate.toLocaleString('ES-es', { month: 'long' }),
        year:dateToDate.toLocaleString('ES-es', { year: 'numeric'}),
        dayNumber: dateToDate.getDate()
    }

    return (
        <div className="max-w-[1440px] w-full update-home-container flex flex-col">
            <div className="flex flex-col justify-between content-center border-solid border-4 border-slate-300 cursor-pointer">
                <button onClick={buttonHandler} name={_id} className="w-full">
                    <div className="grid grid-flow-row grid-cols-1 justify-center items-center ">
                        <h1 className="font-bold justify-self-center text-xl p-4 w-fit">{title}</h1>
                        <div className="flex flex-row gap-2 justify-center items-center bg-slate-700 p-2">
                            <p className="text-xl text-white">{eventDay.dayNumber}</p>
                            <p className="text-xl capitalize text-white">{eventDay.month}</p>
                            <p className="text-xl text-white">{eventDay.year}</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Events;