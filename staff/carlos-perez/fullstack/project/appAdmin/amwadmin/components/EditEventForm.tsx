"use client";
import { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


const EditEventForm = (_id: any) => {
    const [evento, setEvent] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        try {
            fetch('http://localhost:4321/events/' + _id.id, { cache: 'no-store' })
                .then((res) => res.json())
                .then((data) => {
                    setEvent(data);
                    setLoading(false);
                    /*
                    const eventDateToSplit = evento.eventDate.split('T');
                    evento.date = eventDateToSplit[0];
                    evento.time = eventDateToSplit[1];*/
                })
        }
        catch (error: any) {
            alert(error.message);
        }
    }, [])

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
        const eventDate = date + 'T' + time;


        const url = 'http://localhost:4321/events/' + _id.id
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.token}`
            },
            body: JSON.stringify({
                title: title,
                eventDate: eventDate,
                location: location,
                text: text,
                links: [link1, link2],
                visibility: true
            })
        })

        if (res.status === 201) {
            alert('Event updated')
        }
        else {
            alert('Something went wrong. Please, try again');
        }
    }

    function handleCancel() {
        router.push('/events')
    }

    if (isLoading) return <p>Loading...</p>
    if (!evento) return <p>No profile data</p>

    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-2xl p-4 bg-blue-100">Edit</h1>
                <button className='bg-red-300 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52 justify-self-center' onClick={handleCancel}>Cancel</button>
                <div className='p-8 justify-center items-center h-fit w-auto flex'>
                    <form className='flex flex-col flex-wrap gap-6 w-full justify-center justify-items-center' onSubmit={onSubmit}>
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 title' id='title' type='text' aria-label='title' placeholder='Title' defaultValue={evento.title} />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 date' id='date' type='date' aria-label='date' placeholder='Date' defaultValue={evento.date} />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 time' id='time' type='time' aria-label='time' placeholder='Time' defaultValue={evento.time} />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 location' id='location' type='text' aria-label='location' placeholder='Location' defaultValue={evento.location} />
                        <textarea className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 text' id='text' aria-label='text' placeholder='Text' defaultValue={evento.text} />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 link1' id='link1' type='text' aria-label='link1' placeholder='Link' defaultValue={evento.links[0]} />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 link2' id='link2' type='text' aria-label='link2' placeholder='Link' defaultValue={evento.links[1]} />
                        <button className='bg-slate-700 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52' type='submit'>
                            Send
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditEventForm;
