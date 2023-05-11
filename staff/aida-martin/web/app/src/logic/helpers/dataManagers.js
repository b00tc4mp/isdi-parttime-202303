import { users, posts } from '../../data'

/**
 * Finds user by email
 *
 * @param {string} email The user's email
 *
 * @returns {object} User
 */

export function findUserByEmail (email) {
  return users().find((user) => user.email === email)
}

/**
 * Finds user by ID
 *
 * @param {string} userId The user's ID
 *
 * @returns {object} User
 */

export function findUserById (userId) {
  return users().find((user) => user.id === userId)
}

/**
 * Finds post by ID
 *
 * @param {string} postId The post's ID
 *
 * @returns {object} Post
 */

export function findPostById (postId) {
  return posts().find((post) => post.id === postId)
}
