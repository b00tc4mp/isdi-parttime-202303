
import React, { useEffect, useState } from 'react';
import retrievePlacesList from '../../logic/retrievePlacesList';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const searchPlace = () => {
    const [placeName, setPlaceName] = useState('');
    const [placeDetails, setPlaceDetails] = useState(null);

    const handleInputChange = (event) => {
        setPlaceName(event.target.value);
    };

    const handleRetrieveDetails = async () => {
        try {
            const details = await retrievePlacesList(placeName);
            setPlaceDetails(details);
        } catch (error) {
            console.error('Error:', error);
            setPlaceDetails(null);
        }
    };

    const handleCreatePlace = () => {
        console.log('Create new Place');
    };



    return (
        <div>
            <div className="flex flex-row w-full">
                <div className='relative w-full'>


                    <input
                        className='pl-8'
                        type="text"
                        value={placeName}
                        onChange={handleInputChange}
                        placeholder="Enter place name" />

                    <span className='absolute top-5 left-1 h-6 w-6  rounded-full'>
                        <MagnifyingGlassIcon className='text-gray-500 ' />
                    </span>
                </div>
                <button onClick={handleRetrieveDetails}>Search for a place</button>
            </div>
            <button onClick={handleCreatePlace}>Create a new place</button>

            {placeDetails && (
                <div>
                    <ul>Result:</ul>

                    <table className=' w-full '>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>city</th>
                                <th>web</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {placeDetails.slice(0, 5).map((item) => (
                                <React.Fragment key={item.placeId}>
                                    <tr >
                                        <td>{item.name}</td>
                                        <td>{item.city}</td>
                                        <td>{item.homePage}</td>
                                        <td>
                                            <button>select</button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div >
            )}
        </div >
    );

};

export default searchPlace;
