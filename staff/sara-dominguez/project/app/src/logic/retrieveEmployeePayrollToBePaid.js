import context from './context'
//TODO preguntas a Manu documentar
/**
 * Retrieve a employee from API
 * 
 * 
 * @returns {Promise} employee  
//  * 
//  * @throws {TypeError} On non-string 
// 
 */

export default (id) => {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/retrieveEmployeePayrollToBePaid/${id}`, {
            headers: {
                authorization: `Bearer ${context.token}`
            }
        })
        if (res.status === 200) {
            return res.json()
        } else {
            const { error: message } = await res.json()

            throw new Error(message)
        }
    })()
}
