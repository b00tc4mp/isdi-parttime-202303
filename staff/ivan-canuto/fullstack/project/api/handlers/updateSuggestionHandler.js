const { updateSuggestion } = require("../logic");
const { handleErrors, extractUserId } = require("./helpers");


module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { suggestionId } = req.params
    const { title, content } = req.body

    const promise = updateSuggestion(userId, suggestionId, title, content)

    return(async () => {
        await promise

        res.status(204).send()
    })()
})