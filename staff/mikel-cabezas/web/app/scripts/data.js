export const users = () => 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

export function saveUsers (users) {
    localStorage.usersJson = JSON.stringify(users)
}

export function saveUser (user) {
    const _users = users()
    const index = _users.findIndex(_users => _users.id === user.id)
    if(index < 0)
        _users.push(user)
    else
        _users.splice(index, 1, user)
    saveUsers(_users)
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
