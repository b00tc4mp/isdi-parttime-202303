console.log('load data-managers')

import { users, posts } from "../../data.js"


export function findUserByEmail(email){

    // let foundUser
    // for(let i = 0; i< users.length; i++){
    //     let user = users[i]

    //     if(user.email === email){
    //         foundUser= user
    //     break
    //     }
    // }
    // return foundUser

    return users().find(user => user.email === email)
}
export function findUserById(userId){

//     let foundUser
//     for(let i = 0; i< users.length; i++){
//         let user = users[i]

//         if(user.id === userId){
//             foundUser= user
//         break
//         }
//     }
//     return foundUser
    
    return users().find(user => user.id === userId)
}

export function findPostById(postId){

    // let foundPost
    // for(let i = 0; i< posts.length; i++){
    //     let post = posts[i]

    //     if(post.id === postId){
    //         foundPost= post
    //     break
    //     }
    // }
    // return foundPost
    
    return posts().find(post => post.id === postId)
}
