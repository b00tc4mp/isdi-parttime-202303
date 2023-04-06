console.log("load ui")

export const cleanUser = (registerPage) => {
    registerPage.querySelector("input[type=text]").value = ""
    registerPage.querySelector("input[type=email]").value = ""
    registerPage.querySelector("input[type=password]").value = ""
}

export function show(...containers){
    for (const container of containers)
    container.classList.remove('off')
}

export function hide(...containers){
    for  (const container of containers)
    container.classList.add('off')
}
export function toggle(...containers){
    for (const container of containers)
    container.classList.toggle('off')
}

export function addClass(className, ...containers){
    for (const container of containers){
        container.classList.add(className);
    }
}
export function removeClass (className, ...containers){
    for(const container of containers){
        container.classList.remove(className);
    }
}
