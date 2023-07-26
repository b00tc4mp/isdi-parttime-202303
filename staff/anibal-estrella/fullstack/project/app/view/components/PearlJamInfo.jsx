
import React, { useEffect, useState } from 'react';

const PearlJamDetails = () => {
    const [bandDetails, setBandDetails] = useState(null);
    const [albumReleases, setAlbumReleases] = useState(null);

    useEffect(() => {
        // Function to fetch Pearl Jam details
        const fetchPearlJamDetails = async () => {
            try {
                const artistName = 'Pearl Jam';
                const artistSearchUrl = `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(
                    artistName
                )}&fmt=json`;

                // Fetch Pearl Jam artist details
                const artistResponse = await fetch(artistSearchUrl);
                const artistData = await artistResponse.json();

                if (artistData.artists.length > 0) {
                    const artistId = artistData.artists[0].id;
                    const artistUrl = `https://musicbrainz.org/ws/2/artist/${artistId}?inc=tags&fmt=json`;

                    // Fetch Pearl Jam band details
                    const bandResponse = await fetch(artistUrl);
                    const bandData = await bandResponse.json();
                    setBandDetails(bandData);

                    const releasesUrl = `https://musicbrainz.org/ws/2/release-group/?artist=${artistId}&type=album&limit=10&fmt=json`;

                    // Fetch Pearl Jam album releases
                    const releasesResponse = await fetch(releasesUrl);
                    const releasesData = await releasesResponse.json();
                    setAlbumReleases(releasesData['release-groups']);
                }
            } catch (error) {
                console.error('Error fetching Pearl Jam details:', error);
            }
        };

        fetchPearlJamDetails();
    }, []);

    if (!bandDetails || !albumReleases) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Pearl Jam Band Details:</h2>
            <p>Name: {bandDetails.name}</p>
            <p>Country: {bandDetails.country}</p>
            <p>Begin Date: {bandDetails['life-span'].begin}</p>
            <p>End Date: {bandDetails['life-span'].end}</p>

            <h2>Album Releases:</h2>
            <ul>
                {albumReleases.map((release) => (
                    <li key={release.id}>{release.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PearlJamDetails;


