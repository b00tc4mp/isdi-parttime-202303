//usage in components
// import { handleKeyPress } from './path/to/keyPressUtils'
// <input onKeyPress={(event) => handleKeyPress(event, actionFunction)}

export const handleKeyPress = (event, actionFunction) => {
    if (event.key === 'Enter') {
        if (actionFunction && typeof actionFunction === 'function') {
            actionFunction(); // Execute the custom function
        }
    }
};
