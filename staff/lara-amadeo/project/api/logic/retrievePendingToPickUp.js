const { User } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')

module.exports = async function retrievePendingToPickUp(userId) {

    const user = await User.findById({ _id: userId }).populate('order.items.meal').populate('order.items.author').lean()

    if (!user) throw new ExistanceError(`User with id ${userId} not found`)

    //const pendingOrders = user.order.filter(order => order.status === 'pending')
    const formattedOrders = user.order.map(order => {
        const itemsByAuthor = {}
        debugger
        order.items.forEach(item => {
            const mealAuthorId = item.meal.author.id

            if (!itemsByAuthor[mealAuthorId]) {
                itemsByAuthor[mealAuthorId] = {
                    author: item.author,
                    meals: [],
                }
            }

            itemsByAuthor[mealAuthorId].meals.push({
                meal: item.meal,
                quantity: item.quantity,
            })
        })

        return {
            serial: order.serial,
            date: order.date,
            status: order.status,
            items: Object.values(itemsByAuthor),
        }
    })

    return formattedOrders

}