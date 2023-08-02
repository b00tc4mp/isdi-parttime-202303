import context from './context'
//TODO preguntas a Manu documentar
/**
 * Retrieve a employee from API
 * 
 * 
 * @returns {Promise<string>} employee  
//  * 
//  * @throws {TypeError} On non-string 
// 
 */

export default () => {
    return fetch(`${import.meta.env.VITE_API_URL}/employees/retrieve`, {
        headers: {
            authorization: `Bearer ${context.token}`
        }

    })

        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    throw new Error(body.message)
                })
        })
}