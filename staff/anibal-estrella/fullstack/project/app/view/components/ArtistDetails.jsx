
import { useEffect, useState } from 'react';
import retrieveArtistDetails from '../../src/logic/retrieveArtistDetails';

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
            <h1>Artist Details</h1>
            <input
                type="text"
                value={artistName}
                onChange={handleInputChange}
                placeholder="Enter artist name"
            />
            <button onClick={handleRetrieveDetails}>Retrieve Details</button>

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

                    {/* Display other artist details from the artistDetails object */}
                    {/* For example, you can access bandDetails and albumReleases */}
                </div>
            )}
        </div>
    );
};

export default ArtistDetails;
