import { errors } from 'com'

const {
    ContentError,
    FormatError,
    DuplicityError,
    ExistenceError,
    AuthError
} = errors

export default () => {
    return callback => {
        try {
            const promise = callback()

                ; (async () => {
                    try {
                        await promise
                    } catch (error) {
                        showError(error)
                    }
                })()
        } catch (error) {
            showError(error)
        }
    }
}

const showError = (error) => {
    if (error instanceof DuplicityError)
        alert(error.message)
    else if (error instanceof ExistenceError)
        alert(error.message)
    else if (error instanceof AuthError)
        alert(error.message)
    else if (error instanceof TypeError)
        alert(error.message)
    else if (error instanceof ContentError)
        alert(error.message)
    else if (error instanceof FormatError)
        alert(error.message)
    else if (error instanceof RangeError)
        alert(error.message)
    else
        alert(error.message)
}