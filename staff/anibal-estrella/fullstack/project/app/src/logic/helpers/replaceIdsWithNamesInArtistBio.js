const BASE_URL = import.meta.env.VITE_BASE_URL
const DISCOGS_API_KEY = import.meta.env.VITE_DISCOGS_API_KEY
const DISCOGS_API_SECRET_KEY = import.meta.env.VITE_DISCOGS_API_SECRET_KEY

async function replaceIdsWithNamesInArtistBio(text) {
    async function getEntityNameById(entityType, entityId) {
        const url = `${BASE_URL}/${entityType}/${entityId}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET_KEY}`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                return data.name;
            } else {
                console.error(`Error fetching ${entityType} with ID ${entityId}:`, response.statusText);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching ${entityType} with ID ${entityId}:`, error);
            return null;
        }
    }

    const idPattern = /\[([alm]\d+)\]/g;
    const entityIds = text.match(idPattern);

    if (!entityIds) {
        return text;
    }

    const uniqueEntityIds = [...new Set(entityIds)]; // Remove duplicates

    for (const entityId of uniqueEntityIds) {
        const entityType = entityId[1] === "a" ? "artists" : entityId[1] === "l" ? "labels" : "master";
        const entityIdWithoutBrackets = entityId.substring(2, entityId.length - 1);
        const entityName = await getEntityNameById(entityType, entityIdWithoutBrackets);
        if (entityName) {
            text = text.replace(entityId, entityName);
        }
    }


    const charactersToRemove = ['[a=', ']', '[m=']
    function removeCharactersFromArray(text, charactersToRemove) {
        let newText = text;

        for (const character of charactersToRemove) {
            const regex = new RegExp(character, 'g');
            newText = newText.replace(regex, '');
        }

        return newText;
    }

    return removeCharactersFromArray(text, charactersToRemove);
}

export default replaceIdsWithNamesInArtistBio;

