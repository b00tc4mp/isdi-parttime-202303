"use client";

import { UpdateProps } from "@/types";
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { deleteUpdate } from "@/utils";


interface UpdatesHomeProps {
    update: UpdateProps;
}
const Update = ({ update }: UpdatesHomeProps) => {

    const router = useRouter();

    const { _id, title, image, text, date } = update;
    const dateToDate= new Date(date);
    const dateFormatted = dateToDate.toLocaleString('es-ES');

    async function handleDelete(){
        await deleteUpdate(_id);
        router.push('/updates');
    }

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
                        <div className="flex flex-row gap-3">
                        <button className='bg-slate-700 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52' onClick={() => router.push('/updates/edit/'+_id)}>
                            Edit
                        </button>
                        <button className='bg-red-300 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52' onClick={handleDelete}>
                            Delete
                        </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update;