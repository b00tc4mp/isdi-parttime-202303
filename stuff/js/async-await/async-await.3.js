async function fun() {
    return 10
}

fun()
// Promise {<fulfilled>: 10}[[Prototype]]: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: 10
fun().then(console.log)
// 10
// Promise {<fulfilled>: undefined}