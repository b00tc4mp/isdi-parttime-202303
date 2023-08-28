export const context = {
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

    set os(os) {
        sessionStorage.os = os;
    },

    get os() {
        return sessionStorage.os;
    }
}