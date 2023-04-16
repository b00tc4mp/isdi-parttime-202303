 console.log('load data') 
 
 export const users= 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

// users.push({
//     id: 'user-1',
//     name: 'Rufus',
//     email: 'rufus@rufus.es',
//     password: 'Aa-1234'
    
// })

// users.push({
//     id: 'user-2',
//     name: 'Frida',
//     email: 'frida@frida.es',
//     password: 'Aa-1234'
// })

// users.push({
//     id: 'user-3',
//     name: 'Tigre',
//     email: 'tigre@tigre.es',
//     password: 'Aa-1234'
// })


export const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []

// posts.push({
//     id: 'post-1 ',
//     author: 'user-1',
//     image: 'https://i.pinimg.com/originals/32/6e/42/326e422e458f82375899f778a776346e.jpg',
//     text: 'Black braco like me!',
//     date: new Date(2023, 0, 31, 23, 45, 0)
// })

// posts.push({
//     id: 'post-2 ',
//     author: 'user-1',
//     image: 'https://www.diariodesevilla.es/2021/09/28/mascotas/Braco-weimar_1615048615_144521006_1200x675.jpg',
//     text: 'Grey braco!',
//     date: new Date(2023, 1, 28, 0, 56, 12)
// })
 
// posts.push({
//     id: 'post-3 ',
//     author: 'user-2',
//     image: 'https://img.freepik.com/foto-gratis/primer-plano-labrador-marron-oscuro-aislado-sobre-fondo-blanco_181624-34796.jpg',
//     text: 'Brown Labrador like me!',
//     date: new Date(2023, 4, 10, 1, 10, 46 )
// })


export function saveUsers() {
    localStorage.usersJson = JSON.stringify(users)
}

export function savePosts() {
    localStorage.postsJson = JSON.stringify(posts)
}