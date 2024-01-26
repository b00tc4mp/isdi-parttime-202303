import context from './context'
import { errors } from 'com'

/**
* Retrieve a employee from API
*
* @returns {Promise} employee  
*/

export default () => {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/retrieveEmployeeLogged`, {
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
