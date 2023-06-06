/*Countdown*/
var countDownDate = new Date("Jul 21, 2023 21:30:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {
  console.log (btoa("Hello, world"));
  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "End curse...well done!";
  }
}, 1000);

/*End CountDown*/
/*Email validation*/
function emailValidation(email)
{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {

    return true;

  } else {

    return false;

  }
}
/*Simple password validation*/ 
  function passwordValidation(input) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (input.match(passw)) {
       
       return true;
    }
    else {
     
       return false;
    }
 }

