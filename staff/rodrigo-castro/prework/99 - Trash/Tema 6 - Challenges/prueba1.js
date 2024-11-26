const prubea = ["Rodrigo", "Rodrigo", "Rodrigo", "Fernando", "Rodrigo", "Rodrigo", "Rodrigo", "Rodrigo"];
console.log(prubea);
prubea.forEach((nombre) => {
    let nombreAux;
    if (nombre === "Fernando"){
        nombreAux = prompt("Ingrese nuevo nombre");
        nombre = nombreAux.toLowerCase();
    };
});
console.log(prueba);