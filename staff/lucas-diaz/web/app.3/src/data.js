export const users = "usersJson" in localStorage  ? JSON.parse(localStorage.usersJson) : []

/* users.push({
    id: "user-1",
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: 'WendyDarling22!'
})
users.push({
    id: "user-2",
    name: 'Peter Pan',
    email: 'peter@pan.com',  
    password: 'PeterPan22!'
})
users.push({
    id: "user-3",
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: 'PepitoGrillo22!'
})
users.push({
    id: "user-4",
    name: 'Lucas Diaz',
    email: 'lucas@gmail.com',
    password: 'LucasDiaz22!',
    avatar: "https://static.vecteezy.com/system/resources/previews/019/861/654/non_2x/3d-modern-house-or-home-isometric-modern-building-and-architecture-free-png.png"
}) */

export const posts = "postsJson" in localStorage  ? JSON.parse(localStorage.postsJson) : []

// esto lo hacemos porque el objeto cuando viene de JSON la date vuelve como string y tenemos que volver a pasarla a formato Date
posts.forEach(post => post.date = new Date(post.date));

/* posts.push({
    id: "post-1",
    author: "user-1",
    image: "https://img.freepik.com/vector-gratis/planes-diseno-casa_23-2147665806.jpg?2",
    text: "Love interiorism",
    date: new Date(2023, 0, 31, 23, 45)
})
posts.push({
    id: "post-2",
    author: "user-3",
    image: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/35137/house-home-clipart-xl.png",
    text: "Love this style",
    date: new Date(2023, 1, 28, 30)
})
posts.push({
    id: "post-3",
    author: "user-4",
    image: "https://static.vecteezy.com/system/resources/previews/019/861/654/non_2x/3d-modern-house-or-home-isometric-modern-building-and-architecture-free-png.png",
    text: "How about this style??",
    date: new Date(2023, 4, 15, 20, 15)
})
 */

export function saveUsers(){
    localStorage.usersJson = JSON.stringify(users);
}

export function savePosts(){
    localStorage.postsJson = JSON.stringify(posts);
}