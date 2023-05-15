import { validateId, validateNumber } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'
import { postsAuction, savePostsAuction } from '../data'

export default function createPostAuction(userId, postId, dateEnd, startPrice) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateNumber(startPrice, 'startPrice')

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const postAuction = findpostsAuctionById(postId)

    if (postAuction) throw new Error(`post with id ${postId} it's already up for auction`)

    const tmpPostsAuction = postsAuction()

    tmpPostsAuction.push({
        postid: postId,
        userId: userId,
        dateEnd: dateEnd,
        price: startPrice
    })

    savePostsAuction(tmpPostsAuction)
}