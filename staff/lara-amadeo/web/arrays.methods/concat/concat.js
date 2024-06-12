
function concat(array1, ...arrays){
let newArray = []

    for (let i = 0; i < array1.length; i++){
        newArray[i] = array1[i]
    }

    for(arr of arrays){
        for (let i = 0; i < arr.length; i++){
            newArray[newArray.length] = arr[i]
        }
    }
  return newArray
}