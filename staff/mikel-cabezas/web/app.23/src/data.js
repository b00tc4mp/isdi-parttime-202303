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
        callback(null, user)
    })
    
}


export const posts = () => {
    const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []

    posts.forEach(post => {
        if(typeof post.date === 'string') {
            post.date = new Date (post.date)
        }
    })

    return posts
}

export function savePost (post) {
    const _posts = posts()
    const index = _posts.findIndex(_posts => _posts.id === post.id)
    if(index < 0)
        _posts.push(post)
    else
        _posts.splice(index, 1, post)

    savePosts(_posts)
}

export function savePosts (posts) {
    localStorage.postsJson = JSON.stringify(posts)
}

export function findPostbyId(postId, callback) {

    let foundUser
    posts().forEach(post => {
        if (post.id === postId) {
            foundUser = post
        }
    })
    return foundUser
}