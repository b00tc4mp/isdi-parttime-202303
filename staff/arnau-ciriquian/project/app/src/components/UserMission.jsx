import { View, Text, Image, TouchableOpacity, Alert } from "react-native"
import { useEffect, useState } from "react"
import manageMissionImages from "../logic/manageMissionImages.js"

export default function UserMission({ mission: { id, image, tittle, info, level, difficulty, survivor, visibility, date }, onMissionClicked /*, character*/ }) {
    const [missionImage, setMissionImage] = useState(null)

    //not user but character -> per tenir el lvl i comparar amb el lvl de la missio
        //console.log(user)

    const handleGoToMissionInfo = () => {
        onMissionClicked(id)
    }

    useEffect(() => {
        const imageName = image.slice(21, -4)
        setMissionImage(manageMissionImages(imageName))
    }, [])

    if (visibility) {
        return <TouchableOpacity onPress={handleGoToMissionInfo}>
            <View className="h-20 flex-row items-center justify-between ml-5 mr-5 mt-2">
                {visibility /*canviar per user.level >= mission.level*/ ? <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View> : <View className="absolute bg-red-400 h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>}
                <View className="flex-row w-full h-full items-center">
                    <View className="h-10 w-10 justify-center items-center m-2">
                        <Image source={missionImage} className="h-10 w-10"></Image>
                    </View>
                    <View className="justify-center items-center h-16 w-3/4">
                        <View className="w-full items-center">
                            <Text className=" text-xl font-bold">{tittle}</Text>
                        </View>
                        <View className="w-full items-center">
                            <Text className=" text-lg font-semibold">Level {level} - {difficulty} </Text>
                        </View>
                    </View>
                </View>

            </View>
        </TouchableOpacity>

    }

}