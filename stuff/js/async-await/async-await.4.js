async function fun() {
    throw 100
    return 10
}

fun()
    .then(console.log)
    .catch(console.error)
    .then(() => fun())
    .then(console.log)
    .catch(console.error)
// 488-306837b8d2ef5dd2.js:1 100
// window.console.error @ 488-306837b8d2ef5dd2.js:1
// Promise.catch (async)
// (anonymous) @ VM585:8
// 488-306837b8d2ef5dd2.js:1 100
// window.console.error @ 488-306837b8d2ef5dd2.js:1
// Promise.catch (async)
// (anonymous) @ VM585:11
// Promise {<fulfilled>: undefined}