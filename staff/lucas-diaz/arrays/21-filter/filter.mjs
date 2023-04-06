function filter(arr,callback){
    let results = []

    for (const value of arr)
        if (callback(value))
            results[results.length] = value;
    return results
}



export default filter