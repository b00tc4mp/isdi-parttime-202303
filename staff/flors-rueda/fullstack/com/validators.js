const validateMail = (mail) => {
  if (typeof mail !== 'string') throw new Error('mail is not an string', { cause: 'mail' });
  if (!mail.trim().length) throw new Error('mail is empty', { cause: 'mail' });
  const regexRule = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regexRule.test(mail)) throw new Error('mail format is not valid', { cause: 'mail' });
};

const validatePassword = (password) => {
  if (typeof password !== 'string') throw new Error('password is not a string', { cause: 'password' });
}

const validateRepeatPassword = (password, repeatPassword) => {
  validatePassword(password);
  validatePassword(repeatPassword);
  if (password !== repeatPassword) throw new Error('password and confirmation password are different', { cause: 'password' });
};

const validateName = (name) => {
  if (typeof name !== 'string') throw new Error('name is not a string', { cause: 'name' });
  if (!name.trim().length) throw new Error('name is empty', { cause: 'name' });
};

const validateUsername = (username) => {
  if (typeof username !== 'string') throw new Error('username is not a string', { cause: 'username' });
  if (!username.trim().length) throw new Error('username is empty', { cause: 'username' });
  const regexRule = /^@[a-z0-9]*$/;
  if (!regexRule.test(username)) throw new Error('username format is not correct', { cause: 'username' });
};

const validateImage = (url) => {
  if (typeof url !== 'string') throw new Error('url is not a string', { cause: 'avatar' });
  if (!url.trim().length) throw new Error('url is empty', { cause: 'avatar' });
  const regexRule = /^\s*(?:(?:[A-Za-z0-9+/]{4})+\s*)*[A-Za-z0-9+/]*={0,2}\s*$/;
  if (regexRule.test(url)) throw new Error('is not an image url', { cause: 'avatar' });
};

const validateId = (id) => {
  if (typeof id !== 'string') throw new Error('id is not a string', { cause: 'id' });
  if (!id.trim().length) throw new Error('id is empty', { cause: 'id' });
};

const validatePostText = (text) => {
  if (typeof text !== 'string') throw new Error('text is not a string');
  if (!text.trim().length) throw new Error('text is empty');
  if (text.length > 180) throw new Error('text is exceeds max characters')
};


const validateCallback = (callback) => {
  if (typeof callback !== 'function') throw new Error(`callbak is not a function`);
}


module.exports = {
  validateMail,
  validatePassword,
  validateName,
  validateRepeatPassword,
  validateUsername,
  validateImage,
  validateId,
  validatePostText,
  validateCallback,
}