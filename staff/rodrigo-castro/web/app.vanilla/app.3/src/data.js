console.log('data loaded')

export const users = 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

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

export const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []

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

export function saveUsers() {
    localStorage.usersJson = JSON.stringify(users)
}

export function savePosts() {
    localStorage.postsJson = JSON.stringify(posts)
}