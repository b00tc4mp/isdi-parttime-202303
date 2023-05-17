import { validateId } from './helpers/validators'
import { posts, loadUsers } from '../data'

export default function retrievePosts(userId, callback) {
    validateId(userId, 'user id')

    loadUsers(users => {
        const found = users.some(user => user.id === userId)
    
        if(!found){
            callback(new Error ('User id not valid'))

            return
        } 
    
        callback(null, posts().toReversed())
    })
}