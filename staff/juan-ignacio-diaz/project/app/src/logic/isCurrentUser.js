import context from './context'
import { utils } from 'com'

const { extractSubFromToken } = utils


/**
 * Check if the userId is the current user
 * 
 * @param {string} userId The user's id
 * 
 * @returns {boolean} The true if user is the current user
 */

export default (userId) => userId === extractSubFromToken(context.token)