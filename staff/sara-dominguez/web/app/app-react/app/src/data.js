 // users 
//  export const loadUsers = () => 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

const DELAY = 100

 export const loadUsers = (callback) => setTimeout(() => {
     callback('usersJson' in localStorage? JSON.parse(localStorage.usersJson) : [])
    }, DELAY)
 

export function saveUsers(users, callback) {
    setTimeout(() => {
    localStorage.usersJson = JSON.stringify(users)

    callback()
    }, DELAY)
}



// export function saveUser(user) {
//     const _users = users()

//     const index = _users.findIndex(_user => _user.id === user.id)
//     if (index < 0){
//         _users.push(user)
//     }else{
//         _users.splice(index, 1, user)
//     }
    
//     saveUsers(_users)
// }

export function saveUser(user, callback) {
    loadUsers(users =>{
        const index = users.findIndex(_user => _user.id === user.id)
        if (index < 0){
            users.push(user)
        }else{
            users.splice(index, 1, user)
        }

    saveUsers(users, callback)
})
}


export function findUserByEmail(email, callback){
    loadUsers(users => {
        const user = users.find(user => user.email === email)

        callback(user)
    })
}   

export function findUserById(userId, callback) {
    loadUsers(users =>{
        callback(users.find(user => user.id === userId))
    })
}

// posts

export const posts = () => {
    const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []

    posts.forEach(post => post.date = new Date(post.date))
    
    return posts

}
export function savePosts(posts) {
    localStorage.postsJson = JSON.stringify(posts)
}

export function savePost(post) {
    const _posts = posts()

    const index = _posts.findIndex(_post => _post.id === post.id)
    if (index < 0){
        _posts.push(post)
    }else{
        _posts.splice(index, 1, post)
    }

    savePosts(_posts)
}

export function findPostById(postId){
    
    return posts().find(post => post.id === postId)
}