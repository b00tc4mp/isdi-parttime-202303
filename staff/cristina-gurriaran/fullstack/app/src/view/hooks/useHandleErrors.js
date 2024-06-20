import { useAppContext } from '../hooks'
import { errors } from 'com'

const {
    DuplicityError,
    ContentError,
    ExistenceError,
    AuthError,
    PermitError
} = errors 

export default () => {
    const { alert } = useAppContext()

    return callback => {
        try{
            const promise = callback()

            ; (async () => {
                try {
                    await promise
                } catch (error) {
                    showError(error, alert)
                }
            })()
        } catch (error) {
            showError(error, alert)
        }
    }
}

function showError(error, alert) {
    if (error instanceof DuplicityError)
        alert(error.message, 'error')
    else if (error instanceof ExistenceError)
        alert(error.message, 'warn')
    else if (error instanceof ContentError)
        alert(error.message, 'warn')
    else if (error instanceof AuthError)
        alert(error.message, 'error')
    else if (error instanceof PermitError)
        alert(error.message, 'error')
    else if (error instanceof TypeError)
        alert(error.message, 'warn')
    else if (error instanceof RangeError)
        alert(error.message, 'error')
    else
        alert(error.message, 'error')
}