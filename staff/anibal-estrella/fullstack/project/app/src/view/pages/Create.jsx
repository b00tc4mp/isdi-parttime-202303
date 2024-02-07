import React, { useState, useEffect } from 'react'
import { useAppContext } from '../hooks'
import { Button } from '../library'


// import { SearchArtistList as SearchArtist, SearchPlace } from '../components'
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Create = ({ city, ipGeoLocation, openDrawer, isDrawerOpen }) => {
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const [Profile, setProfile] = useState(null);
    const [error, setError] = useState(null); // Add state for error


    const [formData, setFormData] = useState({
        author: '',
        poster: '',
        name: '',
        description: '',
        lineUp: [],
        dates: [],
        place: '',
        price: 0,
        likes: [],
        eventReviews: []
    });

    const handleCreate = () => {
        console.log('create!!!');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    }

    return (
        <section id="create" className=" px-3">

            <div className=' px-3'>
                {city && <p>Your City: {city} </p>}
                {city && <p>Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </p>}
            </div >

            <h2>What do you want to create?</h2>

            <div className='grid grid-cols-2  gap-2 pt-4  h-72 '>
                <div className='flex flex-col p-4 pt-16 bg-gray-300 hover:bg-gray-200 duration-300 rounded-2xl '>
                    <h3>I just want to create an event</h3>
                    <p>Fill up the fields, date, place, poster, line up artists...</p>
                    <Button onClick={handleCreate} className={'mt-auto max-w-fit'}>Create Event</Button>
                </div>
                <div className='flex flex-col rounded-2xl p-4 pt-16  bg-gray-300 hover:bg-gray-200 duration-300'>                    <h3>I want to create an event review</h3>
                    <p>Fill up the fields, create event, text review, images, audio, video, score...</p>
                    <Button onClick={handleCreate} className={' mt-auto max-w-fit'}>Create Review</Button>
                </div>
            </div>



        </section>

    )
};

export default Create;
