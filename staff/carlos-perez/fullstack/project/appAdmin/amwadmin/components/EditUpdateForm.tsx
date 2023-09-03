import { FormEvent } from 'react'
import { patchUpdate } from '@/utils';
import { UpdateProps } from "@/types";

interface UpdatesHomeProps {
    update: UpdateProps;
}

const EditUpdateForm = ({ update }: UpdatesHomeProps) => {
    
    const {_id, title, image, text} = update;

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const target = event.target as typeof event.target & {
            title: { value: string }
            image: { value: string }
            text: { value: string }
        }


        const title = target.title.value;
        const image = target.image.value;
        const text = target.text.value;
        

        await patchUpdate(_id,title, image, text);
    }
    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-2xl p-4 bg-blue-100">Edit</h1>
                <div className='p-8 justify-center items-center h-fit w-auto flex'>
                    <form className='flex flex-col gap-6 w-full justify-center justify-items-center' onSubmit={onSubmit}>
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 title' id='title' type='text' aria-label='title' placeholder='Title' defaultValue={title}/>
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 image' id='image' type='text' aria-label='image' placeholder='Instagram Image URL' defaultValue={image}/>
                        <textarea className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 text' id='text' aria-label='text' placeholder='Text' defaultValue={text} />
                        <button className='bg-slate-700 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52' type='submit'>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUpdateForm;
