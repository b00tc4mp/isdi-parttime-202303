import { users } from "../../app-React.2/src/data"

const DELAY = 100

export const loadUsers = callback => setTimeout(() => {
    callback("usersJson" in localStorage ? JSON.parse(localStorage.usersJson) : [])
}, DELAY)


export function saveUsers(users, callback) {
    setTimeout(() => {
        localStorage.usersJson = JSON.stringify(users);

        callback(); //avisa, en el sentido de que te llama cuando finaliza el proceso 
    }, DELAY);
}

export function saveUser(user, callback) {
    loadUsers(users => {
        const index = users.findIndex(_user => _user.id === user.id)

        if (index < 0)
            users.push(user)
        else
            users.splice(index, 1, user)
        saveUsers(users, callback)
    })
}

export function findUserById(userId, callback) {
    loadUsers(users => {
        let foundUser = users.find(user => user.id === userId)
        
        callback(foundUser);
    })
}

export function findUserByEmail(email, callback) {
    loadUsers(users => {
        const user = users.find(user => user.email === email)

        callback(user);
    })
}

// --------------------------------------------------------------------------------



export const posts = () => {
    const posts = "postsJson" in localStorage ? JSON.parse(localStorage.postsJson) : []

    posts.forEach(post => post.date = new Date(post.date));
    return posts
}

/* export const pos ts = callback => setTimeout(() => {
    const posts = "postsJson" in localStorage ? JSON.parse(localStorage.postsJson) : []

    posts.forEach(post => post.date = new Date(post.date));

    callback(posts)
}, 100) */

export function savePosts(posts) {
    localStorage.postsJson = JSON.stringify(posts);
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

export function findPostByUserId(userId) {
    let foundPost = posts().find(post => post.author === userId)
    return foundPost;
}

export function findPostByPostId(postId) {
    let foundPost = posts().find(post => post.id === postId)
    return foundPost;
}
