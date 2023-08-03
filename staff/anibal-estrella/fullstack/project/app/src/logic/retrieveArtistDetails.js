import { cleanWikipediaImageUrl } from './helpers/cleanWikipediaImageUrl';
import { getWikipediaLinkFromWikidataId } from './helpers/getWikipediaLinkFromWikidataId';
/**
 * 
 */
const retrieveArtistDetails = async (artistName) => {
    try {
        // Fetch artist details from MusicBrainz API
        const userAgent = 'LiveDive/0.0.1 ( zensirdes@gmail.com )'
        const artistSearchUrl = `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(artistName)}&fmt=json`
        const artistResponse = await fetch(artistSearchUrl, {
            headers: {
                'User-Agent': userAgent,
            },
        });
        const artistData = await artistResponse.json();

        if (artistData.artists.length > 0) {
            const artistId = artistData.artists[0].id;
            const artistUrl = `https://musicbrainz.org/ws/2/artist/${artistId}?inc=url-rels&fmt=json`;

            const bandResponse = await fetch(artistUrl);
            const bandData = await bandResponse.json();


            const releasesUrl = `https://musicbrainz.org/ws/2/release-group/?artist=${artistId}&type=album&limit=10&fmt=json`;
            const releasesResponse = await fetch(releasesUrl);
            const releasesData = await releasesResponse.json();
            var wikiDataUrl

            // get wikidata id
            for (let i = 0; i < bandData.relations.length; i++) {
                const element = bandData.relations[i];
                if (element.type && element.type === "wikidata") {
                    // const wikiDataUrl = element.url.resource.split("/").pop()
                    wikiDataUrl = element.url.resource
                }
            }

            const artistDetails = {
                artist: artistData.artists[0],
                bandDetails: bandData,
                albumReleases: releasesData['release-groups'],
                wikiDataId: wikiDataUrl ? wikiDataUrl.split("/").pop() : null
            };

            const wikipediaLink = await getWikipediaLinkFromWikidataId(artistDetails.wikiDataId)

            debugger
            const wikiSearchUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&origin=*&exintro&explaintext&generator=search&gsrsearch=intitle:${encodeURIComponent(artistDetails.artist.name)}&gsrlimit=1&redirects=1`;

            const wikiResponse = await fetch(wikiSearchUrl, {
                method: "GET"
            });
            const wikiData = await wikiResponse.json();

            function getFirst50Words(inputString) {
                const wordsArray = inputString.trim().split(/\s+/);
                const first50Words = wordsArray.slice(0, 100).join(" ");
                return wordsArray.length <= 50 ? inputString : `${first50Words}...`;
            }

            // Extract relevant information from Wikipedia response
            const pageId = Object.keys(wikiData.query.pages)[0];
            const wikiExtract = getFirst50Words(wikiData.query.pages[pageId].extract);
            const wikiImage = wikiData.query.pages[pageId].thumbnail?.source || null;
            const wikiArticleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(artistDetails.artist.name)}`;

            // Add Wikipedia data to the artistDetails object
            artistDetails.bio = wikiExtract;
            artistDetails.image = cleanWikipediaImageUrl(wikiImage);
            artistDetails.wiki = wikiArticleUrl;

            return artistDetails;
        }
        throw new Error(`No artist found as ${artistName}, try again!`);
    } catch (error) {
        console.error('Error fetching artist details:', error);
    }
};

export default retrieveArtistDetails;

