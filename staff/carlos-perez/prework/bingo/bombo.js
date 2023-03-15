let bombo = [];
let minimo = 1;
let maximo = 99;

function llenarBombo(bombo, minimo, maximo) {
    for (let i = minimo; i < (maximo + 1); i++) {
        bombo.push(i);
    }
}

function randomizaBombo(bombo) {
    for (let i = bombo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [bombo[i], bombo[j]] = [bombo[j], bombo[i]];
    }
}

llenarBombo(bombo, minimo, maximo);
randomizaBombo(bombo);

console.log(bombo);