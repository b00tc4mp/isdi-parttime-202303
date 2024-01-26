
console.log('load data')

export const users = () => 'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : []

// users.push({
//     id: 'user-1',
//     name: 'Wendy Darling',
//     email: 'wendy@darling.com',
//     password: '123123123'
// })

// users.push({
//     id: 'user-2',
//     name: 'Peter Pan',
//     email: 'peter@pan.com',
//     password: '123123123'
// })

// users.push({
//     id: 'user-3',
//     name: 'Pepito Grillo',
//     email: 'pepito@grillo.com',
//     password: '123123123'
// })

export const posts = () => {
    const posts = 'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : []

    posts.forEach(post => post.date = new Date(post.date))

    return posts
}



// posts.push({
//     id: 'post-1',
//     author: 'user-1',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png',
//     text: 'Smile!',
//     date: new Date(2023, 0, 31, 23, 45, 0)
// })

// posts.push({
//     id: 'post-2',
//     author: 'user-1',
//     image: 'https://img.icons8.com/color/512/avatar.png',
//     text: 'I ♥️ Avatars!',
//     date: new Date(2023, 1, 28, 0, 0, 0)
// })

// posts.push({
//     id: 'post-3',
//     author: 'user-2',
//     image: 'https://img.icons8.com/color/512/avatar.png',
//     text: 'I ♥️ Avatars too!',
//     date: new Date(2023, 2, 31, 1, 0, 0)
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