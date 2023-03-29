function validateEmail(email) {
  if (typeof email !== "string") throw new Error("Email is not a string 😥");
  if (!email.length) throw new Error("Email is empty 😥");
}

function validatePassword(password, explain = "Password") {
  if (typeof password !== "string")
    throw new Error(`${explain} is not a string 😥`);
  if (!password.length) throw new Error(`${explain} is empty 😥`);
  if (password.length < 8)
    throw new Error(`${explain} does not have 8 characters 😥`);
}

function validateName(name) {
  if (typeof name !== "string") throw new Error("Name is not a string 😥");
  if (!name.length) throw new Error("Name is empty 😥");
}
