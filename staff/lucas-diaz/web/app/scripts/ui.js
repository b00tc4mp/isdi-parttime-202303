const cleanUser = (registerPage) => {
    registerPage.querySelector("input[type=text]").value = ""
    registerPage.querySelector("input[type=email]").value = ""
    registerPage.querySelector("input[type=password]").value = ""
}


function show(...containers){
    for (let container of containers)
    container.classList.remove('off')
}

function hide(...containers){
    for  (let container of containers)
    container.classList.add('off')
}
function toggle(...containers){
    for (let container of containers)
    container.classList.toggle('off')
}