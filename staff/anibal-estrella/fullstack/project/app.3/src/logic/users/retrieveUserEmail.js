export default email => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/auth/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(res => {
            if (res.status === 200)
                return res.json();

            return res.json()
                .then(body => {
                    throw new Error(body.error);
                });
        });
}