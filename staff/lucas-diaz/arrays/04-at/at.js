function at(arr,index){
    if (index > 0){
        return arr[index];
    } else if (index < 0){
        return arr[arr.length - (-index)]
    }
}
