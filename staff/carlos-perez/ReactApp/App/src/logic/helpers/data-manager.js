import { users, posts } from "../../data.js";

export function userExist(email) {
    let userPosition = null;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.email === email) {
            userPosition = i;
            break;
        }
    }

    if (userPosition === null) {
        return -1;
    }

    return userPosition;
}

export function userExistById(id) {
    let userPosition = null;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.id === id) {
            userPosition = i;
            break;
        }
    }

    if (userPosition === null) {
        return -1;
    }

    return userPosition;
}

export function findUserById(userId) {
    return users.find(user => user.id = userId);
}

export function findPostById(postId) {
    return posts.find(post => post.id = postId);
}