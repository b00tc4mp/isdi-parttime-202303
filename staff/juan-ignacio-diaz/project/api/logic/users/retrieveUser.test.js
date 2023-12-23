const retrieveUser = require('./retrieveUser')

;(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        const user = await retrieveUser('000000000000')
        console.log(user)
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()