const context = {
    set token(token) {
        if (!token) {
            delete sessionStorage.token

            return
        }

        sessionStorage.token = token
    },
    get token() {
        return sessionStorage.token
    },

    set listId(listId) {
        if (!listId) {
            delete sessionStorage.listId

            return
        }

        sessionStorage.listId = listId
    },
    get listId() {
        return sessionStorage.listId
    }
}

export default context