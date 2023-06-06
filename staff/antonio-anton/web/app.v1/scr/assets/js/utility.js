/*Email validation*/
export function emailValidation(email)
{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {

    return true;

  } else {

    return false;

  }
}
/*Simple password validation*/ 
export function passwordValidation(input) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (input.match(passw)) {
       
       return true;
    }
    else {
     
       return false;
    }

    
 }

 console.log('load ui')

export function show(...containers) {
    for (var i = 0; i < containers.length; i++)
        containers[i].classList.remove('off')
}

export function showcomponent(component) {
  
 
}

export function hide(...containers) {
    for (var i = 0; i < containers.length; i++)
        containers[i].classList.add('off')
}

export function toggle(...containers) {
    for (var i = 0; i < containers.length; i++)
        containers[i].classList.toggle('off')
}

export const context = {
  guid: null
}

export function remove_Menu_element(input) {

  document.getElementById('nav').removeChild(input.parentNode);
}