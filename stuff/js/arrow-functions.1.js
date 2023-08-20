// HAPPY
/*
document.querySelector('h1').onclick = function() {
    alert(this.innerText)
}
*/

// UNHAPPY
/*
document.querySelector('h1').onclick = () => {
    alert(this.innerText)
}
*/
/*
document.querySelector('h1').onclick = function() {
    alert(this.innerText)
}.bind(this)
*/