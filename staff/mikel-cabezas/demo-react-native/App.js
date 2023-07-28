import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native';
const BEACH = require('./public/beach.jpg')

export default function App() {
  return (
    <>
      <View
        className="flex-1 bg-white dark:bg-gray-800 items-center justify-center"
      >

        <Image
          source={BEACH}
          className="w-10/12 h-60 mb-4"
        />
        <Text className="dark:text-white">Open up App.js to start working on your app!</Text>

        <TouchableOpacity
          className="bg-gray-500"
          activeOpacity={0.5}
        >
          <Text
            className="text-white p-2"
          >Hi, i'm a button</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
        <View className="flex bg-gray-300 dark:bg-gray-500 flex-row justify-between px-6 py-3 absolute bottom-6 w-10/12 rounded-full">
          <Text>🏠</Text>
          <Text
            onPress={(() => alert('add anything'))}
          >➕</Text>
          <Text>💩</Text>
          <Text>🏝️</Text>
        </View>
      </View>
    </>

  );
}
