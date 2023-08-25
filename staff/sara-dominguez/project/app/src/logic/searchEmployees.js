import context from './context'
import { errors } from 'com'

/**
* Search employees from API
*
* @returns {Promise} employee  
*/

export default (name, firstSurname, secondSurname) => {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/searchEmployees/${name}/${firstSurname}/${secondSurname}`, {
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