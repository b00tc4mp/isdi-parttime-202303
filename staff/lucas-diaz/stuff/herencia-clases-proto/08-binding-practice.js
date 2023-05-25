
let rayito = document.querySelector("span");

rayito.onclick = function (){
    
    const menu = document.createElement("menu");
    const li = document.createElement("li");
    const red = document.createElement("button");
    red.innerText = "red";
    const blue = document.createElement("button");
    blue.innerText = "blue";
    const green = document.createElement("button");
    green.innerText = "green";

    li.append(red, blue, green);
    menu.appendChild(li);
    document.body.append(li);

    red.onclick = () => {
        this.style.backgroundColor = "tomato";
        document.body.removeChild(li)
    }

    blue.onclick = function() {
        this.style.backgroundColor = "dodgerblue";
        document.body.removeChild(li)
    }.bind(this)

    green.onclick = () => {
        this.style.backgroundColor = "lightgreen";
        document.body.removeChild(li)
    }
}
