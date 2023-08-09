const API_KEY = 'FfbiMYCJoGtVeHyIkcTf';
const API_SECRET_KEY = 'irOkQkOpripNUDKROryTfnHWkvFmTcTc';

const BASE_URL = 'https://api.discogs.com';

async function retrieveArtistDetailsFromDiscogs(artistName) {
    const artistDetails = {};
    debugger
    try {
        // Get Artist ID
        const artistResponse = await fetch(`${BASE_URL}/database/search?q=${encodeURIComponent(artistName)}&key=${API_KEY}&secret=${API_SECRET_KEY}&type=artist&sort=popularity`);
        const artistData = await artistResponse.json();

        if (artistData.results.length > 0) {
            const artist = artistData.results[0];
            const artistId = artist.id;

            // Get Artist Profile
            const artistProfileResponse = await fetch(`${BASE_URL}/artists/${artistId}?key=${API_KEY}&secret=${API_SECRET_KEY}`);
            const artistProfileData = await artistProfileResponse.json();

            // Set Artist's Details
            artistDetails.name = artistProfileData.name;
            artistDetails.bio = artistProfileData.profile.replace(/\[.*?\]/g, '');
            artistDetails.image = artistProfileData.images.find(image => image.type === 'primary')?.resource_url || null
            artistDetails.urls = artistProfileData.urls.filter(url =>
                url.includes("facebook") ||
                url.includes("instagram") ||
                url.includes("wikipedia") ||
                url.includes("youtube") ||
                url === artistProfileData.urls[0]
            );

            // Get Artist's Releases
            const releasesResponse = await fetch(`${BASE_URL}/artists/${artistId}/releases?key=${API_KEY}&secret=${API_SECRET_KEY}`);
            const releasesData = await releasesResponse.json();
            const uniqueReleaseNames = new Set();
            const uniqueReleases = releasesData.releases.filter(release => {
                if (!uniqueReleaseNames.has(release.title)) {
                    uniqueReleaseNames.add(release.title);
                    return true;
                }
                return false;
            });
            const releases = uniqueReleases.slice(0, 5)

            // Set First 5 Albums
            artistDetails.albums = releases.map(release => release.title);

            return artistDetails;

        } else {

            throw new Error(`No artist found as ${artistName}, try again!`);

        }
    } catch (error) {
        console.error('Error fetching artist info:', error);
        throw new Error(`'Error fetching artist info:', error`);
    }

}
export default retrieveArtistDetailsFromDiscogs;
