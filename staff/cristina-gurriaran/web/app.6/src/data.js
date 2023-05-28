console.log('load data')
export const DEFAULT_AVATAR_URL = 'https://cdn-icons-png.flaticon.com/512/4925/4925754.png'
export const users = () => 'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : []

// {id: 'user-1',
// name: 'Wendy Darling',
// email: 'wendy@darling.com',
// password: '123123123',
// avatar: 'https://cdn-icons-png.flaticon.com/512/4927/4927515.png'},



// {id: 'user-2',
// name: 'Peter Pan',
// email: 'peter@pan.com',
// password: '123123123',
// avatar: 'https://cdn-icons-png.flaticon.com/512/4925/4925803.png'},



// {id: 'user-3',
// name: 'Pepito Grillo',
// email: 'pepito@grillo.com',
// password: '123123123',
// avatar:'https://cdn-icons-png.flaticon.com/512/4925/4925812.png'}





export const posts = () => {
    const posts = 'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : [
        {
        id: 'post-1',
        author: 'user-1',
        image: 'https://pbs.twimg.com/media/D0WAz5hXgAM68qK?format=jpg&name=medium',
        text: 'Face malfunction',
        date: new Date()
        },

        {
        id: 'post-2',
        author: 'user-1',
        image: 'https://pbs.twimg.com/media/D0BnpNHWkAAynSf?format=jpg&name=medium',
        text: '♥️ COFFEE',
        date: new Date()
        },
            
        {
        id: 'post-3',
        author: 'user-2',
        image: 'https://pbs.twimg.com/media/Dz9oo2uWkAAPVMm?format=jpg&name=medium',
        text: 'Ideal companion',
        date: new Date()
        }

    ]

    posts.forEach(post => post.date = new Date(post.date))

    return posts
}



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