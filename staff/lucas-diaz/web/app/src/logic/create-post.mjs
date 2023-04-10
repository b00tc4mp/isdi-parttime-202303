import { validateId, validateUrl, validateText } from "../logic/helpers/validators.mjs";
import { users } from "../data.mjs";

export default  function createPost(userId, image, text){
    validateId(userId);
    validateUrl(image);
    validateText(text);

    const foundUser = users.find(user => user.email === email);
}