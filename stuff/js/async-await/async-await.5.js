async function fun(num) {
    if (num < .5)
        return 10

    throw 100
}

fun(Math.random())
    .then(console.log)
    .catch(console.error)
    .then(() => fun(Math.random()))
    .then(console.log)
    .catch(console.error)
// 488-306837b8d2ef5dd2.js:1 100
// window.console.error @ 488-306837b8d2ef5dd2.js:1
// Promise.catch (async)
// (anonymous) @ VM616:10
// 10
// Promise {<fulfilled>: undefined}