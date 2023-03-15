let count = 0;

const resetCounter = () => {
    count=0;
    document.getElementById("countlabel").innerHTML = count;
};

const increaseCounter = () => {
    count+=1;
    document.getElementById("countlabel").innerHTML = count;
};

const decreaseCounter = () => {
    count-=1;
    document.getElementById("countlabel").innerHTML = count;
};

document.getElementById("increasebutton").onclick = increaseCounter();
document.getElementById("decreasebutton").onclick = decreaseCounter();
document.getElementById("resetbutton").onclick = resetCounter();

document.getElementById('resetbutton').innerHTML = function(){
    console.log("Hola!");
}

console.log("Esta linkado")
console.log(count)