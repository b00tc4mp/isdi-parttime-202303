let segundos;
let num=0;

let setIntervalID; //Aquí almacenaremos el ID del setInterval para pararlo

//Deshabilitar el botón del Temporizador

const disableButton = () =>{
  const button = document.getElementById("botonTempo");
  button.classList.add('button-disabled');
}

//Habilitar el botón del Temporizador

const enableButton = () => {
  const button = document.getElementById("botonTempo");
  button.classList.remove('button-disabled');
}

//Inicia el intervalo de repetición, cuántos segundos queremos que funcione y arranca la función que se ejecutará en cada intervalo

function tempo(){
  setIntervalID=setInterval(timer, 1000); //setInterval(función, intervalo de tiempo que queramos que se ejecute la función). Devuelve su ID.
  segundos=10;
  disableButton();
  timer();
}



//Decrementa un segundo cada vez, lo muestra por consola, actualiza el elemento en el documento
//Y, cuando segundos llega a 0, para el mecanismo de repetición
function timer(){
  segundos--;
  console.log(segundos);
  document.getElementById("time").textContent=segundos;
  if(segundos==0){
      clearInterval(setIntervalID); //Para esto necesitamos el ID
      enableButton();
  }
}

//Incrementa la variable num y actualiza su valor en el documento
function count(){
num++;
document.getElementById("count").textContent=num;
}

