function splice(array, start, deleteCount = 0, item){
    for(let i = array.length; i >start; i--){
        array[i] = array[i-1]
    }

    array[start] = item

    return []
}

export default splice

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]