export default function some(arr, callback){
    for (const index in arr){
        if (callback(arr[index])) 
        return true;
    }
    return false;
}


//retorna true o false si hay al menos un item