export default function map(arr, callback){
    let result = [];
    for (const item of arr)
        result[result.length] = callback(item);
    return result
}

