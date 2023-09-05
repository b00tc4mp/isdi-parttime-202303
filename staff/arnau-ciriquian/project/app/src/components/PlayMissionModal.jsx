import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import retrieveMission from "../logic/retrieveMission.js"
import manageMissionImages from "../logic/manageMissionImages.js"

export default function PlayMissionModal({ missionId, onCancel, onPlay }) {
    const [mission, setMission] = useState(null)
    const [missionImage, setMissionImage] = useState(null)

    const handleCloseMissionInfo = () => {
        onCancel()
    }

    const handlePlayMission = () => {
        onPlay()
    }

    useEffect(() => {
        try {
            retrieveMission(missionId)
                .then(mission => {
                    setMission(mission)
                    const imageName = mission.image.slice(21, -4)
                    setMissionImage(manageMissionImages(imageName))
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error)
        }
    }, [missionId])

    return (<>
        <View className="w-5/6 h-5/6">
            <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
            {mission && <View className="h-full w-full justify-between">
                <View className="items-center _justify-between m-4 h-3/4">
                    <View className="w-20 h-20">
                        <Image source={missionImage}></Image>
                    </View>
                    <View className="w-full">
                        <Text className="font-semibold text-3xl">{mission.tittle}</Text>

                    </View>
                    <View className="mt-2 w-full">
                        <Text className="font-semibold text-xl">{mission.info}</Text>

                    </View>
                </View>
                <View>
                    <View className="h-20 w-full absolute bottom-0 items-center flex-row justify-around">
                        <TouchableOpacity className="flex flex-row items-center w-2/4 justify-center"
                            onPress={handleCloseMissionInfo}>
                            <Text className="text-2xl font-bold text-red-800">Go back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex flex-row items-center w-2/4 justify-center" onPress={handlePlayMission}>
                            <Text className="text-2xl font-bold ">Play</Text>
                        </TouchableOpacity>
                    </View>
                </View >
            </View>}
        </View>
    </>)
}