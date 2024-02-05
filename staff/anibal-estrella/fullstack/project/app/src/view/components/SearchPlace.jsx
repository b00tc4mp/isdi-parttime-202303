
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../hooks'
import { handleKeyPress } from '../../logic/utilities/keyPressUtils'


import searchPlace from '../../logic/searchPlace';
import { Button } from '../library'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchPlace = () => {
    console.debug('// SearchPlace -> Render')

    const { alert, freeze, unfreeze } = useAppContext()

    const [placeName, setPlaceName] = useState('');
    const [placeDetails, setPlaceDetails] = useState(null);

    const handleInputChange = (event) => {
        setPlaceName(event.target.value);
    };

    const handleSearchPlaces = async () => {
        try {
            freeze();
            const details = await searchPlace(placeName);
            setPlaceDetails(details);
        } catch (error) {
            alert(error.message, 'error');
            setPlaceDetails(null);
        } finally {
            unfreeze();
        }
    };

    const handleCreatePlace = () => {
        console.log('Create new Place');
    }



    return (
        <div>
            <div className="flex flex-row w-full">
                <div className='relative w-full'>
                    <div className="relative">

                        <input
                            className='pl-8'
                            type="text"
                            value={placeName}
                            onChange={handleInputChange}
                            onKeyDown={(event) => handleKeyPress(event, handleSearchPlaces)}
                            placeholder="Enter place name" />
                        <span className='absolute top-3 right-3 h-6 w-6  rounded-full'>

                            <MagnifyingGlassIcon className='text-gray-500 ' />
                        </span>
                        <Button onClick={handleSearchPlaces}>Search for a place</Button>
                    </div>
                </div>
            </div>
            <Button onClick={handleCreatePlace}>Create a new place</Button>

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
                                        <td>
                                            {item.homePage ? (
                                                <a
                                                    className="hover:text-red transition-all duration-300"
                                                    href={item.homePage}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.name}
                                                </a>
                                            ) : (
                                                item.name
                                            )}
                                        </td>
                                        <td>{item.city}</td>
                                        <td>{item.homePage}</td>
                                        <td>
                                            <Button>select</Button>
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

export default SearchPlace;
