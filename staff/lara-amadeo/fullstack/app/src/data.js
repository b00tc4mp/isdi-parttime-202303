
const DELAY = 1000

export const loadUsers = callback => {
    setTimeout(() => {
        callback("usersJSON" in localStorage? JSON.parse(localStorage.usersJSON) : [])
    }, DELAY)
}

export function saveUsersInStorage(users, callback) {
    setTimeout(() => {
        localStorage.usersJSON = JSON.stringify(users)
        callback()
    }, DELAY);
}

export function saveUserInStorage(user, callback) {
    loadUsers(users => {

        const index = users.findIndex(_user => _user.id === user.id)
    
        if(index < 0){
            users.push(user)
        } else {
            users.splice(index, 1, user)
        }
        saveUsersInStorage(users, () => callback(null))
    })
}


export const findUserbyEmail = (email, callback) => {
    loadUsers(users => {
       const user = users.find(user => user.email === email)

       callback(user)
    })
 }

export const findUserbyId = (userId, callback) => {
    loadUsers(users => {
        const user = users.find(user => user.id === userId)

        callback(user)
    })
 }

 //POSTS
export const loadPosts = callback => { 
    setTimeout(() => {
        const posts = 'postsJSON' in localStorage? JSON.parse(localStorage.postsJSON) : []

        posts.forEach(post => post.date = new Date(post.date))

        callback(posts)
    }, DELAY)   
}

export function savePostInStorage(post, callback){
    loadPosts( posts => {

        const index = posts.findIndex(_post => _post._id === post._id)
    
        if(index < 0){
            posts.push(post)
        } else {
            posts.splice(index, 1, post)
        }
    
        savePostsInStorage(posts, () => callback(null))
    })

}

export const savePostsInStorage = (posts, callback) => {
    setTimeout(() => {
        localStorage.postsJSON = JSON.stringify(posts)
        callback()
    }, DELAY) 
}

export const findPostById = (postId, callback) => 
    loadPosts(posts => callback(posts.find(post => post._id === postId)))