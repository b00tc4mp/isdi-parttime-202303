console.log('data loaded')

export const users = () => 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

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
    const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []
    
    posts.forEach(post => post.date = new Date(post.date))

    return posts
}

// posts.push({
//     id: 'post-1',
//     author: 'user-1',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1200px-Smiley.svg.png',
//     text: 'Smile!',
//     date: new Date(2022, 11, 20, 22, 0, 5),
// })

// posts.push({
//     id: 'post-2',
//     author: 'user-1',
//     image: 'https://s1.abcstatics.com/media/play/2020/09/29/avatar-kE4H--1024x512@abc.jpeg',
//     text: 'I ❤️ Avatars!',
//     date: new Date(2023, 2, 11, 13, 11, 0),
// })

// posts.push({
//     id: 'post-3',
//     author: 'user-2',
//     image: 'https://s1.abcstatics.com/media/play/2020/09/29/avatar-kE4H--1024x512@abc.jpeg',
//     text: 'I ❤️ Avatars too!',
//     date: new Date(2023, 3, 1, 12, 32, 44),
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