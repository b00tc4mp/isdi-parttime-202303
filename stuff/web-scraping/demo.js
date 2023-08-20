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

function googl(query, callback) {
    if (callback) {
        var xhr = new XMLHttpRequest

        xhr.onload = () => {
            var results = extractResultsFromGoogleHtml(xhr.response)

            callback(null, results)
        }

        xhr.onerror = () => callback(new Error('connection error'))

        xhr.open('GET', `https://www.google.com/search?q=${query}`)

        xhr.send()
    } else
        return fetch(`https://www.google.com/search?q=${query}`)
            .then(response => response.text())
            .then(html => extractResultsFromGoogleHtml(html))
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

googl('barcelona', (error, results) => {
    if (error) {
        console.error(error)

        return
    }

    renderResults(results)
})

googl('barcelona')
    // .then(results => renderResults(results))
    .then(renderResults)
    .catch(console.error)

