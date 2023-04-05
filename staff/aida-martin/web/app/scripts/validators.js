export function validateEmail(email) {
  if (typeof email !== "string") throw new Error("Email is not a string 😥");
  if (!email.length) throw new Error("Email is empty 😥");

  const validEmail = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/i.test(
    email
  );

  if (!validEmail) throw new Error("Email is not valid 😥");
}
export function validatePassword(password, explain = "Password") {
  if (typeof password !== "string")
    throw new Error(`${explain} is not a string 😥`);
  if (!password.length) throw new Error(`${explain} is empty 😥`);
  if (password.length < 8)
    throw new Error(`${explain} does not have 8 characters 😥`);
}

export function validateName(name) {
  if (typeof name !== "string") throw new Error("Name is not a string 😥");
  if (!name.length) throw new Error("Name is empty 😥");
}
