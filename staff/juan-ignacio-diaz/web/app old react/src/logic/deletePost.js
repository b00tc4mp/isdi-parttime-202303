import { users, saveUsers, posts, savePosts} from "../data"
import { validateId } from "./helpers/validators"


export default function deletePost(userId, postId){
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const tmpUsers = users()

    const user = tmpUsers.some(user => user.id === userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const tmpPosts = posts()

    const index = tmpPosts.findIndex(post => post.id === postId)

    if (index >= 0) tmpPosts.splice(index , 1)
    else throw new Error(`post with id ${postId} not found`)

    tmpUsers.forEach(user => { 
        if (user.savePosts && user.savePosts.includes(postId)) 
            user.savePosts.splice(user.savePosts.findIndex(savePost => savePost===postId), 1)
    });

    savePosts(tmpPosts)
    saveUsers(tmpUsers)
}