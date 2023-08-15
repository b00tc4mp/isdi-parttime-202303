module.exports = () => {
    const randomString = () => {
        const length = 8
        let randomString = ''

        for (let i = 0; i < length; i++) {
            const character = Math.floor((Math.random() * 10) + 1)

            randomString += character
        }
    }
    return randomString
}