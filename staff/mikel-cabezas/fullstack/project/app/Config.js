import * as Updates from 'expo-updates';

let Config = {
    apiUrl: 'https://playgrounds-api.onrender.com',
    enableHiddenFeatures: true,
};

if (Updates.channel === 'production') {
    Config.apiUrl = 'https://playgrounds-api.onrender.com';
    Config.enableHiddenFeatures = false;
} else if (Updates.channel === 'preview') {
    Config.apiUrl = 'https://playgrounds-api.onrender.com';
    Config.enableHiddenFeatures = true;
}

export default Config;