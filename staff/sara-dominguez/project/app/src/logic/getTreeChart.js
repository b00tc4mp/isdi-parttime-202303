import context from './context'
import { errors } from 'com'


/**
* Search Employees by name, firstSurname and SecondSurname
* 
* @param {string} employeeLoggedId - employee logged in
* @param {string} name  employee name
* @param {string} firstSurname   employee firstSurname
* @param {string} secondSurname   employee secondSurname
*
* @returns {Promise}  Array of objects with each employee founded
*
@throws {TypeError} On non-string employeeLoggedId, name or firstSurname or secondSurname
* @throws {ContentError} On invalid format name or firstSurname or secondSurname or employeeId doesn't have 24 characters or not hexadecimal
* @throws {RangeError} On name or firstSurname or secondSurname length lower than 3 characters or upper than 15 characterspassword 
* @throws {Existence} On employee not found
*/


export default (searchPattern) => {
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