const userMessage = "MESSI TRAEME LA COPA";
const codedMessage = [];
const decodedMessage = [];

const romanCrypter = (message) => {
    const divisor = (message.length/2).toFixed(0);
    const secondHalf = message.slice(divisor);
    for (let i = 0; i < divisor; i++){
        codedMessage.push(message[i]);
        codedMessage.push(secondHalf[i]);
    };
    console.log(codedMessage.join(""));
};

const romanDecrypter = () => {
    for (let i = 0; i < userMessage.length; i++){
        if(i%2 === 0){
            decodedMessage.push(codedMessage[i]);
        };        
    };
    for (let i = 0; i < userMessage.length; i++){
        if(i%2 !== 0){
            decodedMessage.push(codedMessage[i]);
        };        
    };
    console.log(decodedMessage.join(""));
};

romanCrypter(userMessage);

romanDecrypter();
