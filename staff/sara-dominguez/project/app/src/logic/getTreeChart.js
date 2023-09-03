import context from './context'
import { errors, validators } from 'com'
const { validateSearchPattern } = validators

/**
* Get TreeChart by searching employees (searchPattern)
* 
* @param {string} searchPattern  A string with the desired search criteria
*
* @returns {Promise}  Array object (TreeChart)
*
* @throws {TypeError} On non-string  searchPattern
* @throws {ContentError} On searchPattern is empty
*/

export default (searchPattern) => {
    validateSearchPattern(searchPattern)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/getTreeChart/${searchPattern}`, {
            headers: {
                authorization: `Bearer ${context.token}`
            }
        })
        if (res.status === 200) {
            return res.json()
        } else {
            const { type, message } = await res.json()

            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
}