const { deleteAllConversations } = require("../logic");
const { handleErrors, extractUserId } = require("./helpers");


module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    
    const promise = deleteAllConversations(userId)

    return(async () => {
        await promise

        res.status(204).send()
    })()
})