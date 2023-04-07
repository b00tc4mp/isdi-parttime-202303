// var array = [1, 3, 5] 
// console.log(array.constructor === Array)

function isArray(array) {
    if(array.constructor === Array && array.length <= 0) {
        return console.log(false)
    }

    if(array.constructor !== Array) {
        return console.log(false)
    }

    if(array.constructor === Array) {
        return console.log(true)
    }

}