import { useAppContext } from '../hooks'
import { errors } from 'com'

const {
    DuplicityError,
    ExistenceError,
    AuthError,
    ContentError
} = errors

export default () => {
    const { alert, unfreeze } = useAppContext()

    return callBack => {
        try {
            const promise = callBack()

            ; (async () => {
                try {
                    await promise
                } catch (error) {
                    showError(error, alert)
                    unfreeze()
                }
            })()
        } catch (error) {
            showError(error, alert)
            unfreeze()
        }
    }
}

function showError(error, alert) {
    if (error instanceof DuplicityError)
        alert(error, 'error')
    else if (error instanceof ExistenceError)
        alert(error, 'error')
    else if (error instanceof AuthError)
        alert(error, 'error')
    else if (error instanceof TypeError)
        alert(error, 'error')
    else if (error instanceof ContentError)
        alert(error, 'error')
    else if (error instanceof RangeError)
        alert(error, 'error')
    else
        alert(error, 'error')
}