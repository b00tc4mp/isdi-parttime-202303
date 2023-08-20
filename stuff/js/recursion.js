debugger

var a = [10, 20, 30]

/*
function forEach(array, callback) {
    for (const element of array)
        callback(element)
}
*/

function forEach(array, callback) {
    (function loop(i = 0) {
        if (i < array.length) {
            const element = array[i]
            
            callback(element)

            loop(i + 1)
        }
    })()
}


forEach(a, e => console.log(e))