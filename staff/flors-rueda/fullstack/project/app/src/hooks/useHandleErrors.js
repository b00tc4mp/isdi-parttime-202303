import useAppContext from './useAppContext'
import { errors } from 'com'


export default () => {
    const { alert } = useAppContext()

    return callback => {
        try {
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
    alert(error.message)
}