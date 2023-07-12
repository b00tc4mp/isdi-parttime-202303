export default () => {
    return fetch('https://api.quotable.io/random', {
        method: 'GET'})
        .then(res => {
            return res.json()
                .then(response => {
                    const { content } = response
                    return content
                })
                .catch(() => {return ''})
        })
}