import context from "./context"

export default () => {

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(({ error: message }) => { throw new Error(message) })

           
        })   
        .catch(error => new Error(error)) 

}