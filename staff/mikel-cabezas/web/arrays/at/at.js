function at(array, index) {

    if (index > 0) {
        console.log(`Using an index of ${index} the item returned is ${array[index]}`);
    }

    if(index < 0) {
        console.log(`Using an index of ${index} the item returned is ${array[array.length + index]}`);
    }

}
