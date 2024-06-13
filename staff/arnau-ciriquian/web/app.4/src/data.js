export const users = () => 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

// users.push({
//     id: 'user-1',
//     name: 'Wendy Darling',
//     email: 'wendy@darling.com',
//     password: '123123123',
// })

// users.push({
//     id: 'user-2',
//     name: 'Peter Pan',
//     email: 'peter@pan.com',
//     password: '123123123',
// })

// users.push({
//     id: 'user-3',
//     name: 'Pepito Grillo',
//     email: 'pepito@grillo.com',
//     password: '123123123',
// })

export const posts = () => 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []


// posts.push({
//     id: 'post-1',
//     author: 'user-1',
//     image: 'https://i.pinimg.com/originals/3f/bc/d5/3fbcd57a031c934f4dbc5872874ecde8.jpg',
//     text: 'Bear with me...',
//     date: new Date()
// })

// posts.push({
//     id: 'post-2',
//     author: 'user-1',
//     image: 'https://img.icons8.com/color/512/avatar.png',
//     text: 'Feeling blue...',
//     date: new Date()
// })

// posts.push({
//     id: 'post-3',
//     author: 'user-2',
//     image: 'https://img.icons8.com/color/512/avatar.png',
//     text: 'I ♥️ Avatars too!',
//     date: new Date()
// })

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