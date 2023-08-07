import { useAppContext } from '../hooks'
import { errors } from 'com'

const {
    DuplicityError,
    ExistenceError,
    AuthError,
    ContentError
} = errors

export default () => {
    const { alert } = useAppContext()

    return callBack => {
        try {
            const promise = callBack()

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
        alert(error, 'error')
    else if (error instanceof ExistenceError)
        alert(error, 'warn')
    else if (error instanceof AuthError)
        alert(error, 'error')
    else if (error instanceof TypeError)
        alert(error, 'warn')
    else if (error instanceof ContentError)
        alert(error, 'warn')
    else if (error instanceof RangeError)
        alert(error, 'error')
    else
        alert(error, 'error')
}