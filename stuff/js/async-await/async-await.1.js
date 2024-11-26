/*
setTimeout(() => console.log('hola mundo'), 1000)
*/

const setTimeoutPromised = millis => new Promise((resolve, reject) => setTimeout(resolve, millis))

    //setTimeoutPromised(1000).then(() => console.log('hola mundo'))

    /**/
    ; (async () => {
        const timeoutId = await setTimeoutPromised(1000)

        console.log('hola mundo')
    })()
/**/
// Promise {
//     <pending>}
// VM602: 13 hola mundo