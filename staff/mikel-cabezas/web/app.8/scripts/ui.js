export const bodyPage = document.querySelector('body')


export function deleteClassOnContainer(container, ...classToDelete) {
    container.classList.remove(...classToDelete);
} 

export function addClassOnContainer(container, ...classToAdd) {
    container.classList.add(...classToAdd)    
}

export function changeMessageOnContainer(container, message, messageType) {
    container.innerHTML = message;
    container.classList.add(messageType);

}
export function clearMessageContainer(container) {
    container.classList.remove('success');
    container.classList.remove('error');
    container.innerHTML = '';
} 
export function toggleOffClassInSection(...containers) {
    for(var i = 0; i < containers.length; i++)  
        containers[i].classList.toggle('off')
}

export function showHidePassword (container, passwordContainer) {
    var icon = container.querySelector(passwordContainer + '> i')
    
    if(icon.classList.contains('uil-eye')) {
        icon.classList.add('uil-eye-slash')
        icon.classList.remove('uil-eye')
        icon.parentElement.querySelector(passwordContainer + '> input').removeAttribute('type', 'password')
        return
    }
    if(icon.classList.contains('uil-eye-slash')) {
        icon.classList.add('uil-eye')
        icon.classList.remove('uil-eye-slash')
        icon.parentElement.querySelector(passwordContainer + '> input').setAttribute('type', 'password')
        return
    }
}

// export const context = {
//     userId: null
// }
export const context = sessionStorage
