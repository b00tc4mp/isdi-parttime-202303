export const users = "usersJSON" in localStorage? JSON.parse(localStorage.usersJSON) : []
    

export const posts = "postsJSON" in localStorage? JSON.parse(localStorage.postsJSON) : []

posts.forEach(post => post.date = new Date(post.date))

    // {
    //     id: 'post-1',
    //     author: 'user-1',
    //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png',
    //     text: 'Smile!',
    //     date: new Date(2023, 0, 23, 14, 23, 17)
    // },
    // {
    //     id: 'post-2',
    //     author: 'user-1',
    //     image: 'https://img.asmedia.epimg.net/resizer/FEnKmiocWO1OvSVNEKb0a-SkaYc=/1952x1098/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/GDS5BJTNXNPYPNRUDI4CAORX5U.jpg',
    //     text: 'I luv Toy Story!',
    //     date: new Date(2023, 2, 25, 13, 23, 17)
    // },
    // {
    //     id: 'post-3',
    //     author: 'user-1',
    //     image: 'https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2019/08/26/1042056.jpg',
    //     text: 'I love Nemo!',
    //     date: new Date(2023, 3, 11, 7, 23, 17)
    // }


export function saveUsersInStorage() {
    
    localStorage.usersJSON = JSON.stringify(users)
}

export function savePostsInStorage() {
    localStorage.postsJSON = JSON.stringify(posts)
}