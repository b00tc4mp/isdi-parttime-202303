import { savePostAuction } from '../data'
import { findUserById, findPostAuctionById } from './helpers/dataManagers'
import { validateId, validateNumber } from './helpers/validators'

export default function updatePostAuction(postId, userId, price) {
    validateId(postId)
    validateId(userId)
    validateNumber(price)

    if (!findUserById(userId)) throw new Error("Error to user")

    const postAuction = findPostAuctionById(postId)

    if (!postAuction) throw new Error(`post with id ${postId} not found`)

    postAuction.userId = userId
    postAuction.price = price

    savePostAuction(postAuction)  
}