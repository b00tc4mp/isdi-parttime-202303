"use client";
import { FormEvent } from 'react'
import { UpdateProps } from "@/types";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UpdatesHomeProps {
    update: UpdateProps;
}

const EditUpdateForm = (_id: any) => {
    console.log(_id.id);

    const [update, setUpdate]= useState(null);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        try{
        fetch('http://localhost:4321/updates/'+_id.id, { cache: 'no-store' })
          .then((res) => res.json())
          .then((data) => {
            setUpdate(data);
            setLoading(false);
          })}
          catch(error: any){
            alert(error.message);
          }
      }, [])

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
        

        const url = 'http://localhost:4321/updates/' + _id.id
        const res = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`
          },
          body: JSON.stringify({
            title: title,
            image: image + '/media/?size=l',
            text: text,
            rsstext: text,
            visibility: true
          })
        })
      
        if (res.status === 201) {
          alert('Update updated')
        }
        else {
          alert('Something went wrong. Please, try again');
        }
    }

    function handleCancel(){
        router.push('/updates')
    }

    if (isLoading) return <p>Loading...</p>
    if (!update) return <p>No profile data</p>

    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-2xl p-4 bg-blue-100">Edit</h1>
                <button className='bg-red-300 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52 justify-self-center' onClick={handleCancel}>Cancel</button>
                <div className='p-8 justify-center items-center h-fit w-auto flex'>
                    <form className='flex flex-col flex-wrap gap-6 w-full justify-center justify-items-center' onSubmit={onSubmit}>
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 title' id='title' type='text' aria-label='title' placeholder='Title' defaultValue={update.title}/>
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 image' id='image' type='text' aria-label='image' placeholder='Instagram Image URL' defaultValue={update.image}/>
                        <textarea className='bg-gray-200 shadow-inner rounded-l p-2 flex-auto text h-auto min-h-[300px] resize-y:' id='text' aria-label='text' placeholder='Text' defaultValue={update.text} />
                        <div className='flex flex-row gap-4'>
                        <button className='bg-slate-700 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52' type='submit'>
                            Send
                        </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUpdateForm;
