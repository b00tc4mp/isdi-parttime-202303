export function getWikipediaLinkFromWikidataId(wikidataId) {
    // Step 1: Retrieve the Wikidata entity
    const apiUrl = `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            try {
                const englishTitle = data.entities[wikidataId].sitelinks.enwiki.title;

                return `https://en.wikipedia.org/wiki/${encodeURIComponent(englishTitle)}`

            } catch (error) {
                console.log("English Wikipedia link not found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

