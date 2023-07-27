/**
 * 
 */
const retrieveArtistDetails = async (artistName) => {
    try {
        // Fetch artist details from MusicBrainz API
        const artistSearchUrl = `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(
            artistName
        )}&fmt=json`;
        const artistResponse = await fetch(artistSearchUrl);
        const artistData = await artistResponse.json();

        if (artistData.artists.length > 0) {
            const artistId = artistData.artists[0].id;
            const artistUrl = `https://musicbrainz.org/ws/2/artist/${artistId}?inc=tags&fmt=json`;

            const bandResponse = await fetch(artistUrl);
            const bandData = await bandResponse.json();

            const releasesUrl = `https://musicbrainz.org/ws/2/release-group/?artist=${artistId}&type=album&limit=10&fmt=json`;
            const releasesResponse = await fetch(releasesUrl);
            const releasesData = await releasesResponse.json();

            // Prepare the MusicBrainz data to return
            const artistDetails = {
                artist: artistData.artists[0],
                bandDetails: bandData,
                albumReleases: releasesData['release-groups'],
            };
            debugger
            // Fetch artist details from Wikipedia API
            const wikiSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&origin=*&format=json&exintro&explaintext&titles=${encodeURIComponent(artistDetails.artist.name)}`;

            const wikiResponse = await fetch(wikiSearchUrl, {
                method: "GET"
            });
            const wikiData = await wikiResponse.json();

            // Extract relevant information from Wikipedia response
            const pageId = Object.keys(wikiData.query.pages)[0];
            const wikiExtract = wikiData.query.pages[pageId].extract;
            const wikiImage = wikiData.query.pages[pageId].thumbnail?.source || null;

            // Add Wikipedia data to the artistDetails object
            artistDetails.bio = wikiExtract;
            artistDetails.image = wikiImage;

            return artistDetails;
        }
    } catch (error) {
        console.error('Error fetching artist details:', error);
    }
};

export default retrieveArtistDetails;

