export default function toReversed(arr){
    let cloneArr = [...arr];

    let finalArr = [];

    for(let i = cloneArr.length -1 ; i >= 0; i--){
        
        finalArr[finalArr.length] = cloneArr[i];
    }
    return finalArr;
}


