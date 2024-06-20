"use client";

import { CalendarDayProps } from "@/types";

interface CalendarDayProp{
    dayEvent: CalendarDayProps
}

const CalendarDay = ({dayEvent}: CalendarDayProp ) => {

    const {day, month, dayNumber} = dayEvent

    return (
        <div className="flex flex-col xl:grid xl:grid-flow-row xl:grid-cols-2 xl:h-full justify-center items-center p-3">
            <div className="flex-col justify-center items-center rounded-lg bg-white overflow-hidden shadow-md w-52">
                <div className="bg-blue-500 text-white py-4 px-8">
                    <p className="text-2xl font-semibold text-white uppercase tracking-wide text-center">{month}</p>
                </div>
                <div className="flex-col justify-center items-center">
                    <p className="text-2xl text-gray-400 text-center pt-3 px-4 leading-none">{day}</p>
                    <p className="font-bold text-black text-center pb-3 px-4 leading-none text-8xl">{dayNumber}</p>
                </div>
            </div>
        </div>
    )
}

export default CalendarDay;