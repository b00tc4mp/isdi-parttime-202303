
import { useEffect, useState } from 'react';
import retrieveArtistDetails from '../../logic/retrieveArtistDetails';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchArtist = () => {
    const [artistName, setArtistName] = useState('');
    const [SearchArtist, setSearchArtist] = useState(null);

    const handleInputChange = (event) => {
        setArtistName(event.target.value);
    };

    const handleRetrieveDetails = async () => {
        try {
            const details = await retrieveArtistDetails(artistName);
            setSearchArtist(details);
        } catch (error) {
            console.error('Error:', error);
            setSearchArtist(null);
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

            {SearchArtist && (
                <div>
                    <h2>Artist Name: {SearchArtist.name}</h2>
                    <h3>From: {SearchArtist.from}</h3>
                    <p>Artist Bio: {SearchArtist.bio}
                        <a href={SearchArtist.wiki} target="_blank">Wikipedia</a>
                    </p>
                    <ul>Albums:
                        {SearchArtist.albums.slice(0, 5).map((album) => (
                            <li key={album.id}> {album.title}</li>
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
