import context from './context'
import { utils } from 'com'

const { isTokenValid, isTokenAlive } = utils

/**
 * Check if the user is logged in
 * 
 * @returns {boolean} The true if user is logged in
 */

export default () => isTokenValid(context.token) && isTokenAlive(context.token)