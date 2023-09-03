import context from './context'
import { validators, errors } from 'com'
const { validateSearchPattern } = validators


/**
* Search Employees by searchPattern
* 
* @param {string} employeeLoggedId - employee logged in
* @param {string} searchPattern  A string with the desired search criteria
*
* @returns {Promise}  Array of objects with each employee founded
*
@throws {TypeError} On non-string searchPattern
@throws {ContentError} On empty value of searchPattern
*
*/


export default (searchPattern) => {
    validateSearchPattern(searchPattern)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/searchEmployees/${searchPattern}`, {
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