
export default function retrieveUser(token) {

    return fetch('http://localhost:4000/users', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })

            return res.json()
        })
}
