console.log('load data')

export const users = 'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : []

// users.push({
//     id: 'user-1',
//     name: 'Wendy Darling',
//     email: 'wendy@darling.com',
//     password: '123123123',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/4927/4927515.png'
// })

// users.push({
//     id: 'user-2',
//     name: 'Peter Pan',
//     email: 'peter@pan.com',
//     password: '123123123',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/4925/4925803.png'
// })

// users.push({
//     id: 'user-3',
//     name: 'Pepito Grillo',
//     email: 'pepito@grillo.com',
//     password: '123123123',
//     avatar:'https://cdn-icons-png.flaticon.com/512/4925/4925812.png'
// })

export const posts = 'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : []

// posts.push({
//     id: 'post-1',
//     author: 'user-1',
//     image: 'https://pbs.twimg.com/media/D0WAz5hXgAM68qK?format=jpg&name=medium',
//     text: 'Face malfunction',
//     date: new Date()
// })

// posts.push({
//     id: 'post-2',
//     author: 'user-1',
//     image: 'https://pbs.twimg.com/media/D0BnpNHWkAAynSf?format=jpg&name=medium',
//     text: '♥️ COFFEE',
//     date: new Date()
// })

// posts.push({
//     id: 'post-3',
//     author: 'user-2',
//     image: 'https://pbs.twimg.com/media/Dz9oo2uWkAAPVMm?format=jpg&name=medium',
//     text: 'Ideal companion',
//     date: new Date()
// })


export function saveUsers(){
    localStorage.usersJson = JSON.stringify(users)
}

export function savePosts(){
    localStorage.postsJson = JSON.stringify(posts)
}

