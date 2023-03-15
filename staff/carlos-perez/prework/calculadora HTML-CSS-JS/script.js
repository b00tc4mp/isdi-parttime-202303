let register='';

const toScreen = (value) => {
    document.getElementById("screen").textContent += value;
}

const calculate= () => {
    let expresion = document.getElementById("screen").textContent;
    document.getElementById("previous").textContent=expresion;
    let result=eval(expresion);
    if(result=='Infinity'){
        clearScreen();
        alert('No puedes dividir algo entre 0. Es una indeterminación');
    }
    else{
        document.getElementById("screen").textContent =result;
    }
}

const clearScreen = () => {
    document.getElementById("screen").textContent = "";
    document.getElementById("previous").textContent="";
}

const signChange = () => {
    let expresion = document.getElementById("screen").textContent;
    let result=eval(expresion);
    result=result*(-1);
    document.getElementById("screen").textContent = result;
}

const percentage = () => {
    let expresion = document.getElementById("screen").textContent;
    let result=eval(expresion);
    result=result/100;
    document.getElementById("screen").textContent = result;
}

const useRegister = () => {
    if(register!==''){
        toScreen(register);
    }
}

const addToRegister =  () => {
    register=document.getElementById("screen").textContent;
}

const deleteRegister = () => {
    register='';
}

const generateRandom = () => {
    let randomNumber=Math.random();
    toScreen(randomNumber.toFixed(6).toString());
}