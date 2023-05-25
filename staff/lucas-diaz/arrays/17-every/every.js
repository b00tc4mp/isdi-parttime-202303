export default function every(arr, callback){
    for (const index in arr){
        if (!callback(arr[index])) 
        return false;
    }
    return true;
}