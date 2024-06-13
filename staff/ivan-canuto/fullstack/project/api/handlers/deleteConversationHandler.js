const { deleteConversation } = require("../logic");
const { handleErrors, extractUserId } = require("./helpers");


module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { conversationId } = req.params
    
    const promise = deleteConversation(userId, conversationId)

    return(async () => {
        await promise

        res.status(204).send()
    })()
})