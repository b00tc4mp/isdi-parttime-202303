import { validateId } from './helpers/validators'
import { loadUsers, loadPosts } from '../data'

export default function retrievePosts(userId, callback) {
    validateId(userId, 'user id')

    loadUsers(users => {
        const found = users.some(user => user.id === userId)
    
        if(!found){
            callback(new Error ('User id not valid'))

            return
        }

        loadPosts(posts => {
            if(!posts){
                callback(new Error('Posts not found')) //VERIFICAR SI MANU LO HIZO ASÍ

                return
            }

            callback(null, posts.toReversed())
        })
    })
}