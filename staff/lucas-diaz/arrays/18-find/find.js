
export default function find (arr, callback){
    for (const element of arr){
        if (callback(element)){
            return element 
        }
    }
    return undefined;
}