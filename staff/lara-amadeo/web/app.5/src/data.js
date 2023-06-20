
export const users = () => "usersJSON" in localStorage? JSON.parse(localStorage.usersJSON) : []
    
export const posts = () => {   
    const posts = 'postsJSON' in localStorage? JSON.parse(localStorage.postsJSON) : []

    posts.forEach(post => post.date = new Date(post.date))
    return posts
}


export function saveUsersInStorage(users) {
    
    localStorage.usersJSON = JSON.stringify(users)
}

export function savePostsInStorage(posts) {
    localStorage.postsJSON = JSON.stringify(posts)
}

export function saveUserInStorage(user) {
    const _users = users()

    const index = _users.findIndex(_user => _user.id === user.id)

    if(index < 0){
        _users.push(user)
    } else {
        _users.splice(index, 1, user)
    }
    saveUsersInStorage(_users)
}

export function savePostInStorage(post){
    const _posts = posts()

    const index = _posts.findIndex(_post => _post.id === post.id)

    if(index < 0){
        _posts.push(post)
    } else {
        _posts.splice(index, 1, post)
    }

    savePostsInStorage(_posts)
}