function extractResultsFromGoogleHtml(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html')

    var results = []

    var items = doc.querySelectorAll('div[jscontroller=SC7lYd]')

    items.forEach(item => {
        var link = item.querySelector('a')
        var title = link.querySelector('h3')
        var preview = item.querySelector('.VwiC3b.yXK7lf.MUxGbd.yDYNvb.lyLwlc')
        if (!preview)
            preview = item.querySelector('.Uroaid')

        var result = {
            title: title.innerText,
            url: link.href,
            preview: preview.innerText
        }

        results.push(result)
    })

    return results
}

function googl(query) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest

        xhr.onload = () => {
            var results = extractResultsFromGoogleHtml(xhr.response)

            resolve(results)
        }

        xhr.onerror = () => reject(new Error('connection error'))

        xhr.open('GET', `https://www.google.com/search?q=${query}`)

        xhr.send()
    })
}

function renderResults(results) {
    console.table(results)

    document.body.innerHTML = ''

    results.forEach(result => {
        var link = document.createElement('a')
        link.href = result.url
        link.innerText = result.title


        var preview = document.createElement('p')
        preview.innerText = result.preview

        document.body.append(link, preview)
    })
}

// test

googl('barcelona')
    .then(renderResults)
    .catch(console.error)
// Promise {<pending>}
// VM6337:46 
// (index)
// title
// url
// preview
// 0	'FC Barcelona'	'https://www.fcbarcelona.com/en/'	'Official FC Barcelona website. All news about the …ervices and information about Barça and the Club.'
// 1	'Barcelona - Wikipedia'	'https://en.wikipedia.org/wiki/Barcelona'	'Barcelona is a city on the coast of northeastern S…community of Catalonia, as well as the second ...'
// 2	'Barcelona Spain - What to see and do in 2023'	'https://www.barcelona.com/'	'The Barcelona 2023 Guide *-* What to do, what to s…football. Our advice on hotels and accommodation.'
// 3	'Visit Barcelona Turisme de Barcelona Official'	'https://www.barcelonaturisme.com/wv3/en/'	"Experience Barcelona's rich cultural scene with Vi…ater, and festivals, plan your next adventure ..."
// 4	'Barcelona, what to see and do'	'https://www.spain.info/en/destination/barcelona/'	'Barcelona is a city with a wide range of original …ime again. Overlooking the Mediterranean Sea, ...'
// 5	'Barcelona City Council: The Barcelona website'	'https://www.barcelona.cat/en/'	'Practical information on living in the city of Bar…usiness, leisure, maps, innovation and much more.'
// 6	'FC Barcelona (@FCBarcelona_es) / Twitter'	'https://twitter.com/FCBarcelona_es'	"FC Barcelona's Tweets ; Aquí para abrir el camino…ada 2023/24 · 242. 3,037. 18K ; Sincroniza tu ..."
// 7	'Barcelona travel - Spain'	'https://www.lonelyplanet.com/spain/barcelona'	'Barcelona is an enchanting seaside city with bound…ng and dining scene. Start planning your trip ...'
// Array(8)