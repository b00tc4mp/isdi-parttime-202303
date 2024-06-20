console.log('load data')
export const DEFAULT_AVATAR_URL = 'https://cdn-icons-png.flaticon.com/512/4925/4925754.png'
export const LOGO_URL = 'https://accidentallywesanderson.com/wp-content/themes/awa/assets/images/awa-logo-collapsed.svg'
export const users = () => 'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : []

// {id: 'user-1',
// name: 'Wendy Darling',
// email: 'wendy@darling.com',
// password: '123123123',
// avatar: 'https://cdn-icons-png.flaticon.com/512/4927/4927515.png'},



// {id: 'user-2',
// name: 'Peter Pan',
// email: 'peter@pan.com',
// password: '123123123',
// avatar: 'https://cdn-icons-png.flaticon.com/512/4925/4925803.png'},



// {id: 'user-3',
// name: 'Pepito Grillo',
// email: 'pepito@grillo.com',
// password: '123123123',
// avatar:'https://cdn-icons-png.flaticon.com/512/4925/4925812.png'}


export const posts = () => {
    const posts = 'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : []

    posts.forEach(post => post.date = new Date(post.date))

    return posts
}



export function saveUsers(users) {
    localStorage.usersJson = JSON.stringify(users)
}

export function saveUser(user) {
    const _users = users()

    const index = _users.findIndex(_user => _user.id === user.id)

    if (index < 0)
        _users.push(user)
    else
        _users.splice(index, 1, user)

    saveUsers(_users)
}

export function savePosts(posts) {
    localStorage.postsJson = JSON.stringify(posts)
}

export function savePost(post) {
    const _posts = posts()

    const index = _posts.findIndex(_post => _post.id === post.id)

    if (index < 0)
        _posts.push(post)
    else
        _posts.splice(index, 1, post)

    savePosts(_posts)
}