document
  .querySelector(".register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelector(".register").classList.add("off");

    document.querySelector(".login").classList.remove("off");
  });

document
  .querySelector(".login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelector(".login").classList.add("off");

    document.querySelector(".home").classList.remove("off");
  });
