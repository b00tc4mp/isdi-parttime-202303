import { useEffect, useState } from 'react';
import retrieveArtistDetails from '../../logic/retrieveArtistDetails';
import retrieveArtistDetailsFromDiscogs from '../../logic/retrieveArtistDetailsFromDiscogs';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchArtist = () => {
    const [artistName, setArtistName] = useState('');
    const [SearchArtist, setSearchArtist] = useState(null);
    const [error, setError] = useState(null); // Add state for error

    const handleInputChange = (event) => {
        setArtistName(event.target.value);
    };

    // const handleRetrieveDetails = async () => {
    //     try {
    //         const details = await retrieveArtistDetails(artistName);
    //         setSearchArtist(details);
    //     } catch (error) {
    //         console.error('Error:', error);
    //         setSearchArtist(null);
    //     }
    // };
    const handleRetrieveDetails = async () => {
        try {
            const details = await retrieveArtistDetailsFromDiscogs(artistName);
            setSearchArtist(details);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setSearchArtist(null);
            setError(`${artistName} Artist not found`);
        }
    };

    return (
        <div>
            <div className="flex flex-row w-full">
                <div className='relative w-full'>
                    <input type="text" value={artistName} onChange={handleInputChange} placeholder="Enter artist name" className='pl-8' />
                    <span className='absolute top-5 left-1 h-6 w-6  rounded-full'>
                        <MagnifyingGlassIcon className='text-gray-500 ' />
                    </span>
                </div>
                <button onClick={handleRetrieveDetails}>Retrieve Details</button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {SearchArtist && !error && (
                <div>
                    <h2>Artist Name: {SearchArtist.name}</h2>
                    {/* <h3>From: {SearchArtist.from}</h3> */}
                    <p>Artist Bio: {SearchArtist.bio}
                    </p>
                    <div>
                        <h3>{SearchArtist.name}'s links:</h3>
                        <ul>
                            {SearchArtist.urls.map((url, index) => {
                                const urlObject = new URL(url)
                                const siteName = urlObject.hostname.replace('www.', '')
                                return (
                                    <li key={index}>
                                        <a href={url} target="_blank">{siteName}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <ul>Albums:
                        {SearchArtist.albums.map((album, index) => (
                            <li key={index}> {album}</li>
                        ))}
                    </ul>
                    {SearchArtist.image && (
                        <img src={SearchArtist.image} alt={SearchArtist.name} />
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchArtist;
