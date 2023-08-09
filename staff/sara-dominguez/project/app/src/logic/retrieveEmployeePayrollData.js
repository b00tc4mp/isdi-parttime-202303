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

export default () => {
    // return fetch(`${import.meta.env.VITE_API_URL}/employees/retrieve`, {
    //     headers: {
    //         authorization: `Bearer ${context.token}`
    //     }

    // })

    //     .then(res => {
    //         if (res.status === 200)
    //             return res.json()

    //         return res.json()
    //             .then(body => {
    //                 throw new Error(body.message)
    //             })
    //     })


    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/retrieveEmployeePayrollData`, {
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
