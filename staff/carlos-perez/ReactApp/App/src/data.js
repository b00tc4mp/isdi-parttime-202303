import { userExistById } from "./logic/helpers/data-manager"

export const users = []

users.push({
    id: 'user-1',
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123'
})

users.push({
    id: 'user-2',
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
})

users.push({
    id: 'user-3',
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123'
})

export const posts = []

function createPost(userId, image, text) {

    const user = users[userExistById(userId)];

    if (user===-1) throw new Error(`user with id ${userId} not found`);

    const id = userId+'-'+Date.now();
    
    const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date
    }

    posts.push(post);
}


/*posts.push({
    id: 'post-1',
    author: 'user-1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png',
    text: 'Smile!',
    date: new Date()
})*/

createPost('user-1','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png','Smile!');

/*posts.push({
    id: 'post-2',
    author: 'user-2',
    image: 'https://img.icons8.com/color/512/avatar.png',
    text: 'I ♥️ Avatars!',
    date: new Date()
})*/

createPost('user-2','https://img.icons8.com/color/512/avatar.png','I ♥️ Avatars!');

/*posts.push({
    id: 'post-3',
    author: 'user-3',
    image: 'https://img.icons8.com/color/512/avatar.png',
    text: 'I ♥️ Avatars too!',
    date: new Date()
})*/

createPost('user-3','https://img.icons8.com/color/512/avatar.png','I ♥️ Avatars too!');

export function savePosts(posts) {
    localStorage.postsJson = JSON.stringify(posts)
}

export function savePost(post) {
    const _posts = posts

    const index = _posts.findIndex(_post => _post.id === post.id)

    if (index < 0)
        _posts.push(post)
    else
        _posts.splice(index, 1, post)

    savePosts(_posts)
}