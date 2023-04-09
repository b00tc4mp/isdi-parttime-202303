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