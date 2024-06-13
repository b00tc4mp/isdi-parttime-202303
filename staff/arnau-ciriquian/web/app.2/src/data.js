export const users = 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

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

export const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []


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

export function saveUsers() {
    localStorage.usersJson = JSON.stringify(users)
}

export function savePosts() {
    localStorage.postsJson = JSON.stringify(posts)
}