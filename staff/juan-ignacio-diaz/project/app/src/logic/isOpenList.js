import context from './context'

import { validators } from 'com'

const { validateId } = validators

/**
 * Check if the list is open
 * 
 * @returns {boolean} The true if list is open
 */

export default () => {
    try {
        validateId(context.listId)

        return true
    } catch (_) {
        return false
    }
}