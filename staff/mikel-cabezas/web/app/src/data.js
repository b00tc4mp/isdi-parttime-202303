const DELAY = 10

export const loadUsers = callback => setTimeout(() => {
    callback('usersJson' in localStorage? JSON.parse(localStorage.usersJson) : [])
}, DELAY)

export function saveUsers (users, callback) {
    setTimeout(() => {
        localStorage.usersJson = JSON.stringify(users)
    }, DELAY)
}

export function saveUser(user, callback) {
    // const _users = users()
    loadUsers(users => {
        const index = users.findIndex(users => users.id === user.id)
        if(index < 0)
            users.push(user)
        else
            users.splice(index, 1, user)
        saveUsers(users, callback)
    })
}

export function findUserByEmail(email, callback) {
    loadUsers(users => {
        const user = users.find(user => user.email === email)
        
        callback(user)
    })
}
export function findUserById(userId, callback) {
    loadUsers(users => {
        const user = users.find(user => user.id === userId)
        callback(user)
    })
    
}


export const loadPosts = callback => setTimeout(() => {
    const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []
    posts.forEach(post => {
        if(typeof post.date === 'string') {
            post.date = new Date (post.date)
        }
    })
    callback(posts)
}, DELAY)


export function savePosts (posts, callback) {
    setTimeout(() => {        
        localStorage.postsJson = JSON.stringify(posts)
        callback()
    }, DELAY);
}

export function savePost (post, callback) {
    loadPosts(_posts => {
        const index = _posts.findIndex(_posts => _posts.id === post.id)
        if(index < 0)
            _posts.push(post)
        else
            _posts.splice(index, 1, post)
            
            savePosts(_posts, callback)
    })
}


export function findPostbyId(postId, callback) {
    loadPosts(posts => {
        let foundPost = posts.find(post => post.id === postId)
        callback(foundPost)
    })
}
