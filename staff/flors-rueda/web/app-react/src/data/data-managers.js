import { loadPosts, loadUsers } from './data';

export const getId = (username, callback) => 
  loadUsers(users => {
    const getUserId = () => {
    const user = users.filter((_user) => _user.username === username);
    return user[0].id;
    }
  callback(getUserId)
  })

export const getMail = (id, callback) => 
  loadUsers(users => {
    const getUserMail = () => {
    const user = users.filter((_user) => _user.id === id);
    return user[0].mail;
    }
  callback(getUserMail)
  })

export const getUserIndex = (id, callback) => 
  loadUsers(users => {
    const getIndex = () => {
    const user = users.filter((_user) => _user.id === id);
    return users.indexOf(user[0]);
  }
  callback(getIndex)
  })


export const findPostById = (postId, callback) => 
  loadPosts(posts => {
    callback(posts.find(post => post.id === postId))
  })


export const findUserById = (userId, callback) => 
  loadUsers(users => {
    callback(users.find(user => user.id === userId))
  })

export const findUserByUsername = (username, callback) => 
  loadUsers(users => {
    callback(users.find(user => user.username === username))
  })

export const findUserByMail = (mail, callback) =>
  loadUsers(users => {
    callback(users.find(user => user.mail === mail))
  })