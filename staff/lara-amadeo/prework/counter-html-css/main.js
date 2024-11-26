
let accum = 0

const increaseValue = ()=>{
    accum++
    document.getElementById("counter").innerHTML = accum
}

const decreaseValue = ()=>{
    if (accum >= 0)
    accum--
    document.getElementById("counter").innerHTML = accum
}

const resetValue = ()=>{
    accum = 0
    document.getElementById("counter").innerHTML = accum
}
