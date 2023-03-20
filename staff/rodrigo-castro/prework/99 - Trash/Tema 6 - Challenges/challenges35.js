const userMessage = ["HI  ", "WE  ", "NEED", "HELP"];
const codedMessage = [];

const dictionary = {
    0: ['A', 'K', 'T', 'F', 'O', 'Y'],
    1: ['B', 'L', 'U', 'G', 'P', 'Z'],
    2: ['C', 'M', 'V', 'H', 'Q', '.'],
    3: ['D', 'N', 'W', 'I', 'R', ','],
    4: ['E', 'Ñ', 'X', 'J', 'S', ' ']
};

const codedArray = () => {
    userMessage.forEach((singleWord) => {
        codedMessage.push([]);
    });
};

const encrypter = () => {
    for (let i = 0; i < userMessage.length; i++){
        for ( let j = 0; j < userMessage[i].length; j++){
            if(dictionary[0].includes(userMessage[i][j])){
                codedMessage[i].push("0");
            };
            if(dictionary[1].includes(userMessage[i][j])){
                codedMessage[i].push("1");
            };
            if(dictionary[2].includes(userMessage[i][j])){
                codedMessage[i].push("2");
            };
            if(dictionary[3].includes(userMessage[i][j])){
                codedMessage[i].push("3");
            };
            if(dictionary[4].includes(userMessage[i][j])){
                codedMessage[i].push("4");
            };
        };
    };
};

console.log(userMessage.join(' - '));
codedArray();
encrypter();
console.log(codedMessage.join(' - '));
