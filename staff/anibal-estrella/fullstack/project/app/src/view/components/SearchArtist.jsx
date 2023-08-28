import React, { useEffect, useState } from 'react';
import { useAppContext } from '../hooks'

import searchArtist from '../../logic/searchArtist'
import { Button } from '../library'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchArtist = () => {
    console.debug('// SearchArtist  -> Render')

    const { alert, freeze, unfreeze } = useAppContext()

    const [artistName, setArtistName] = useState('')
    const [searchArtistList, setSearchArtist] = useState(null)
    const [error, setError] = useState(null)
    const [selectedArtistId, setSelectedArtistId] = useState(null)

    const handleInputChange = (event) => {
        setArtistName(event.target.value);
    };


    const handleRetrieveDetails = async () => {
        try {
            freeze();
            const artistList = await searchArtist(artistName);
            setSearchArtist(artistList);
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Artist "${artistName}" was not found`);
            setSearchArtist(null);
        } finally {
            unfreeze();
        }
    }

    const handleSelectArtist = (id) => { // New handler
        if (selectedArtistId === id) {
            setSelectedArtistId(null);
            console.log({ selectedArtistId })
        } else {
            setSelectedArtistId(id);
            console.log({ selectedArtistId })
        }
    }

    return (
        <div>
            <div className="flex flex-row w-full my-2">
                <div className='relative w-full'>
                    <input type="text" value={artistName} onChange={handleInputChange} placeholder="Enter artist name" className='pl-8' />
                    <span className='absolute top-3 left-1 h-6 w-6  rounded-full'>
                        <MagnifyingGlassIcon className='text-gray-500 ' />
                    </span>
                    <Button onClick={handleRetrieveDetails}>Search Artist</Button>
                </div>

            </div>

            {error && <p className="text-lime-200">{error}</p>}

            {searchArtistList && !error && (
                <div>
                    <ul>Result:</ul>
                    <table className=' w-full '>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchArtistList.slice(0, 5).map((item) => (
                                <React.Fragment key={item.id}>
                                    <tr className={selectedArtistId === item.id ? '' : 'text-red'}>
                                        <td>{item.name}</td>
                                        <td>
                                            {/* If the artist is selected */}
                                            {selectedArtistId === item.id && (
                                                <Button onClick={() => handleSelectArtist(item.id)}>
                                                    Unselect
                                                </Button>
                                            )}

                                            {/* If no artist is selected or the current artist is not the one selected */}
                                            {selectedArtistId !== item.id && (
                                                <Button
                                                    onClick={() => handleSelectArtist(item.id)}
                                                    style={{ opacity: selectedArtistId ? 0.5 : 1 }}
                                                    disabled={!!selectedArtistId}>
                                                    Select
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SearchArtist;
