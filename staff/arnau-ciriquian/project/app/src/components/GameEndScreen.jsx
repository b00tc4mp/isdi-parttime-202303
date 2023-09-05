import { View, Text, TouchableOpacity } from 'react-native'
import { registerCompletedMission } from '../logic/registerCompletedMission'

export default function GameEndScreen({ result, onCloseModal, missionId }) {
    const handleFinishAcomplishedMission = () => {
        registerCompletedMission(missionId)
        onCloseModal()
    }

    const handleFinishFailedMission = () => {
        onCloseModal()
    }

    return <>
        {result === 'win' && <View className="flex justify-center items-center h-2/5 w-screen p-5">
            <View className="bg-neutral-500 rounded-3xl opacity-70 w-full h-full absolute shadow-md shadow-black"></View>
            <Text className="text-xl font-semibold text-center text-white m-2 mt-4">
                PERFECT!
            </Text>
            <TouchableOpacity className="border-2 border-red-400 bg-orange-400 opacity-80 rounded-xl w-1/3 items-center shadow-md shadow-black" onPress={handleFinishAcomplishedMission}>
                <Text className="opacity-100 text-xl">
                    Next!
                </Text>
            </TouchableOpacity>
        </View>}
        {result === 'lose' && <View className="flex justify-center items-center h-full w-screen p-5">
            <View className="bg-neutral-500 rounded-3xl opacity-70 w-full h-full absolute shadow-md shadow-black"></View>
            <Text className="text-xl font-semibold text-center text-white m-2 mt-4">
                F**K!
            </Text>
            <TouchableOpacity className="border-2 border-red-400 bg-orange-400 opacity-80 rounded-xl w-1/3 items-center shadow-md shadow-black" onPress={handleFinishFailedMission}>
                <Text className="opacity-100 text-xl">
                    Next!
                </Text>
            </TouchableOpacity>
        </View>}
    </>

}