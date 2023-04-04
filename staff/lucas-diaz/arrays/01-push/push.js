function push(array,...elements){
    for (let element of elements){
        array[array.length] = element;
    }
    return array.length
}  


const a = [10,20];
const b = [30,40];