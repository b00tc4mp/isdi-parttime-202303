import AsyncStorage from '@react-native-async-storage/async-storage';

export default async () => {
    await AsyncStorage.setItem('@WELCOME_MESSAGE', 'false')
}
