export const users = 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

// users.push({
//     id: 'user-1',
//     name: 'Wendy Darling',
//     email: 'wendy@darling.com',
//     password: '123123123',
//     avatar: 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg'
// })

// users.push({
//     id: 'user-2',
//     name: 'Peter Pan',
//     email: 'peter@pan.com',
//     password: '123123123',
//     avatar: 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg'
// })

// users.push({
//     id: 'user-3',
//     name: 'Pepito Grillo',
//     email: 'pepito@grillo.com',
//     password: '123123123',
//     avatar: 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg'
// })

export const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []
let date = new Date()

// posts.push({
//     id: 'post-1',
//     author: 'user-1',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png',
//     text: 'Smile!',
//     date: date.toLocaleDateString()
// })

// posts.push({
//     id: 'post-2',
//     author: 'user-1',
//     image: 'https://img.icons8.com/color/512/avatar.png',
//     text: 'I ♥️ Avatars!',
//     date: date.toLocaleDateString()
// })

// posts.push({
//     id: 'post-3',
//     author: 'user-2',
//     image: 'https://img.icons8.com/color/512/avatar.png',
//     text: 'I ♥️ Avatars too!',
//     date: date.toLocaleDateString()
// })

export const likedPostsId = 'likedPostsIdJson' in localStorage? JSON.parse(localStorage.likedPostsIdJson) : []

export const saveUsers = () => {
    localStorage.usersJson = JSON.stringify(users)
}

export const savePosts = () => {
    localStorage.postsJson = JSON.stringify(posts)
}

export const saveLikedPost = () => {
    localStorage.likedPostsIdJson = JSON.stringify(likedPostsId)
}