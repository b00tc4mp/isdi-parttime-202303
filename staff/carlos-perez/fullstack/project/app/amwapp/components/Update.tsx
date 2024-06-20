"use client";

import { UpdateProps } from "@/types";
import Image from 'next/image';


interface UpdatesHomeProps {
    update: UpdateProps;
}
const Update = ({ update }: UpdatesHomeProps) => {

    const { title, image, text, date } = update;
    const dateToDate= new Date(date);
    const dateFormatted = dateToDate.toLocaleString('es-ES');

    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-xl p-4 bg-slate-700 text-white">{title}</h1>
                <div className="flex flex-col xl:grid xl:grid-flow-row xl:grid-cols-2 xl:h-full items-center">
                    <div className="relative w-full h-[400px] xl:h-[600px] object-contain items-center bg-blue-100">
                        <Image
                            src={image}
                            alt='update image'
                            fill
                            priority
                            className='object-contain'
                        />
                    </div>
                    <div className="w-full p-6 justify-center flex flex-col gap-4">
                        <p className="text-justify">{text}</p>
                        <p>{dateFormatted}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update;