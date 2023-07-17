async function fun(num) {
    if (num < .5)
        return 10

    throw 100
}


; (async () => {
    try {
        const res = await fun(Math.random())

        console.log(res)
    } catch (error) {
        console.error(error)
    }

    try {
        const res = await fun(Math.random())

        console.log(res)
    } catch (error) {
        console.error(error)
    }
})()

// 488-306837b8d2ef5dd2.js:1 100
// window.console.error @ 488-306837b8d2ef5dd2.js:1
// (anonymous) @ VM662:15
// await in (anonymous) (async)
// (anonymous) @ VM662:25
// VM662:21 10
// Promise {<fulfilled>: undefined}