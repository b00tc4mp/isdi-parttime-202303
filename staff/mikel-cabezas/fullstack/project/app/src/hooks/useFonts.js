import * as Font from "expo-font";

export default useFonts = async () =>
    await Font.loadAsync({
        acumin: require('../../assets/fonts/Acumin.otf')
    });