import { cleanWikipediaImageUrl } from './helpers/cleanWikipediaImageUrl';
/**
 * 
 */
const retrievePlaceDetails = async (placeName) => {
    try {
        // Fetch place details from MusicBrainz API
        const userAgent = 'LiveDive/0.0.1 ( zensirdes@gmail.com )'
        const placeSearchUrl = `https://musicbrainz.org/ws/2/place/?query=${encodeURIComponent(placeName)}&fmt=json`
        const placeResponse = await fetch(placeSearchUrl, {
            headers: {
                'User-Agent': userAgent,
            },
        });
        const placeData = await placeResponse.json();

        let placesList = []
        if (placeData.places.length > 0) {
            //create array of places
            for (let i = 0; i < placeData.places.length; i++) {
                const place = placeData.places[i]
                const placeId = place.id
                const placeUrl = `https://musicbrainz.org/ws/2/place/${placeId}?inc=url-rels&fmt=json`
                const placeUrlResponse = await fetch(placeUrl)
                const placeUrlData = await placeUrlResponse.json()
                debugger
                const placeSingle = {
                    placeId: placeUrlData.id,
                    name: placeUrlData.name,
                    city: placeUrlData.area !== null ? placeUrlData.area.name : "some city",
                    homePage: placeUrlData.relations[0] !== undefined && placeUrlData.relations[0].type === "official homepage" ? placeUrlData.relations[0].url.resource : null
                }
                placesList.push(placeSingle)
            }


            // Prepare the MusicBrainz data to return


            return placesList;
        }
        throw new Error(`No place found as ${placeName}, try again!`);
    } catch (error) {
        console.error('Error fetching place details:', error);
    }
};

export default retrievePlaceDetails;

