
import { useEffect, useState } from 'react';
import retrieveArtistDetails from '../../logic/retrieveArtistDetails';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const ArtistDetails = () => {
    const [artistName, setArtistName] = useState('');
    const [artistDetails, setArtistDetails] = useState(null);

    const handleInputChange = (event) => {
        setArtistName(event.target.value);
    };

    const handleRetrieveDetails = async () => {
        try {
            const details = await retrieveArtistDetails(artistName);
            setArtistDetails(details);
        } catch (error) {
            console.error('Error:', error);
            setArtistDetails(null);
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

            {artistDetails && (
                <div>
                    <h2>Artist Name: {artistDetails.artist.name}</h2>
                    <h3>From: {artistDetails.artist.area.name}</h3>
                    <p>Artist Bio: {artistDetails.bio}
                        <a href={artistDetails.wiki} target="_blank">Wikipedia</a>
                    </p>
                    <ul>Albums:
                        {artistDetails.albumReleases.slice(0, 5).map((album) => (
                            <li key={album.id}> {album.title}</li>
                        ))}
                    </ul>
                    {artistDetails.image && (
                        <img src={artistDetails.image} alt={artistDetails.artist.name} />
                    )}
                </div>
            )}
        </div>
    );
};

export default ArtistDetails;
