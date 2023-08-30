import context from './context'

import { validators } from 'com'

const { validateId } = validators

/**
 * Goto List 
 * 
 */

export default (listId) => {
    validateId(listId, 'list id')
    
    context.listId = listId
}