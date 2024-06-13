const { handleErrors, extractUserId } = require("./helpers");
const { retrieveSuggestion } = require("../logic");

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { suggestionId } = req.params

    const promise = retrieveSuggestion(userId, suggestionId)

    return(async () => {
        const suggestion = await promise

        res.send(suggestion)
    })()
})