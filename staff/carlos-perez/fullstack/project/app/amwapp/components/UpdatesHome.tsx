"use client";

import { UpdateProps } from "@/types";
import Image from 'next/image';

interface UpdatesHomeProps {
    update: UpdateProps;
}
const UpdatesHome = ({ update }: UpdatesHomeProps) => {

    const { title, image } = update;

    return (
        <div className="max-w-[1440px] w-full update-home-container flex flex-col">
            <div className="flex flex-col justify-between content-center border-solid border-2 border-blue-100">
                <h1 className="font-bold justify-self-center text-xl p-4">{title}</h1>
                <div className="relative w-full h-60 sm:h-80 object-contain">
                    <Image
                        src={image}
                        alt='update image'
                        fill
                        priority
                        className='object-cover'
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdatesHome;