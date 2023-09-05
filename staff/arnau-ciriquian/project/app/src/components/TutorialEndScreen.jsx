import { View, Text, TouchableOpacity } from 'react-native'

export default function TutorialEndScreen({ result, onCloseTutorial, onRepeatTutorial }) {
    const handleCloseTutorial = () => {
        onCloseTutorial()
    }

    const handleRepeatTutorialGame = () => {
        onRepeatTutorial()
    }

    return <>
        {result === 'win' && <View className="flex justify-center items-center h-2/5 w-screen p-5">
            <View className="bg-neutral-500 rounded-3xl opacity-70 w-full h-full absolute shadow-md shadow-black"></View>
            <Text className="text-xl font-semibold text-center text-white m-2 mt-4">
                Great job! You gave those f***ers got what they deserve, a good dose of lead in their skull! Now, join us in our base of operations! We need more people like you, there's plenty of work to do and even more Z's to exterminate!
            </Text>
            <TouchableOpacity className="border-2 border-red-400 bg-orange-400 opacity-80 rounded-xl w-1/3 items-center shadow-md shadow-black" onPress={handleCloseTutorial}>
                <Text className="opacity-100 text-xl">
                    Continue!
                </Text>
            </TouchableOpacity>
        </View>}
        {result === 'lose' && <View className="flex justify-center items-center h-2/6 w-screen p-5">
            <View className="bg-neutral-500 rounded-3xl opacity-70 w-full h-full absolute shadow-md shadow-black"></View>
            <Text className="text-xl font-semibold text-center text-white m-2 mt-4">
                Damn it! Remember we need you to stay focus and exterminate all Z's ASAP! We need you on your A game survivor! Let's try it again!
            </Text>
            <TouchableOpacity className="border-2 border-red-400 bg-orange-400 opacity-80 rounded-xl w-1/3 items-center shadow-md shadow-black" onPress={handleRepeatTutorialGame}>
                <Text className="opacity-100 text-xl">
                    Retry!
                </Text>
            </TouchableOpacity>
        </View>}
    </>

}