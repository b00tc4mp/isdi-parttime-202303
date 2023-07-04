// go to https://b00tc4mp.com, open inspector, and try it there

var discord = document.querySelector('a')

discord.onclick = function(event) {
    event.preventDefault()
    
    var menu = document.createElement('menu')

    var li = document.createElement('li')
    var red = document.createElement('button')

    /*
    red.onclick = () => {
        this.style.backgroundColor = 'tomato'
    }
    */
    /*
    red.onclick = function() {
        this.style.backgroundColor = 'tomato'
    }.bind(this)
    */
    red.onclick = function() {
        this.style.backgroundColor = 'tomato'
    }
    red.innerText = 'red'

    li.append(red)
    menu.append(li)

    var li = document.createElement('li')
    var green = document.createElement('button')

    green.onclick = () => {
        this.style.backgroundColor = 'greenyellow'
    }
    green.innerText = 'green'

    li.append(green)
    menu.append(li)

    var li = document.createElement('li')
    var blue = document.createElement('button')

    blue.onclick = () => {
        this.style.backgroundColor = 'dodgerblue'
    }
    blue.innerText = 'blue'

    li.append(blue)
    menu.append(li)

    document.body.append(menu)
}