import useAppContext from './useAppContext';

/**
 * Higher-order function for handling errors and displaying them using an alert.
 *
 * @returns {function} A higher-order function that handles errors and displays them using the context alert.
 */
export default () => {
    const { alert } = useAppContext();

    return callback => {
        try {
            const promise = callback();

            ; (async () => {
                try {
                    await promise;
                } catch (error) {
                    showError(error, alert);
                }
            })()
        } catch (error) {
            showError(error, alert);
        }
    }
}

function showError(error, alert) {
    alert(error.message);
}