import { users, posts } from '../../data.mjs'


export function findUserByEmail(email, password){

    return users.find (user => user.email === email)
}

export function findUserById(userId) {

    return users.find (user => user.id === userId)
}


export function findPostById(postId)  {

    return posts.find (post => post.id === postId)

}