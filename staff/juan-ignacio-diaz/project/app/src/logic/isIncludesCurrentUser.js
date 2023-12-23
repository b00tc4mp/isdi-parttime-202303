import context from './context'
import { utils } from 'com'

const { extractSubFromToken } = utils

/**
 * Check if user included
 * 
 * @param {Array: string} usersId The user's ids
 * 
 * @returns {boolean} The true if user is include
 */

export default (usersId) => usersId.includes(extractSubFromToken(context.token))