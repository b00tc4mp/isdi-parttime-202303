import { users, posts } from "../../data";


export function findUserById(userId){
    let foundUser = users().find(user => user.id === userId)
    return foundUser;
}

export function findUserByEmail(email){
    let foundUser = users().find(user => user.email === email)
    return foundUser;
}

export function findPostByUserId(userId){
    let foundPost = posts().find(post => post.author === userId)
    return foundPost;
}

export function findPostByPostId(postId){
    let foundPost = posts().find(post => post.id === postId)
    return foundPost;
}
