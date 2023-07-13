import { validateToken } from './validators'

export function isTokenAlive(token) {
    try {
        validateToken(token)

        return true
    } catch (_) {
        return false
    }
}

export function extractSubFromToken(token) {
    const { sub } = JSON.parse(atob(token.split('.')[1]))

    return sub
}