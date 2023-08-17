import { useEffect, useState } from "react"
import retrieveMission from "../../logic/retrieveMission.js"
import updateMission from "../../logic/updateMission.js"
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

export default function EditMission({ missionId, onCancel, onMissionUpdated }) {
    const [mission, setMission] = useState(null)
    const [tittle, setTittle] = useState('')
    const [info, setInfo] = useState('')

    const [imageOpen, setImageOpen] = useState(false);
    const [imageValue, setImageValue] = useState(null);
    const [imageItems, setImageItems] = useState([
        { label: 'Food retrieval', value: '../../assets/generic/food.png' },
        { label: 'Equipment retrieval', value: '../../assets/generic/construction.png' },
        { label: 'Ammo retrieval', value: '../../assets/generic/ammo.png' },
        { label: 'Survivor rescue', value: '../../assets/generic/rescue.png' },
        { label: 'Companion rescue', value: '../../assets/generic/k9.png' },
        { label: 'Zombie extermination', value: '../../assets/generic/skull.png' }
    ])

    const [levelOpen, setLevelOpen] = useState(false);
    const [levelValue, setLevelValue] = useState(null);
    const [levelItems, setLevelItems] = useState([
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' }
    ])

    const [difficultyOpen, setDifficultyOpen] = useState(false);
    const [difficultyValue, setDifficultyValue] = useState(null);
    const [difficultyItems, setDifficultyItems] = useState([
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
        { label: 'Extreme', value: 'extreme' },
    ])

    const [visibilityOpen, setVisibilityOpen] = useState(false);
    const [visibilityValue, setVisibilityValue] = useState(null);
    const [visibilityItems, setVisibilityItems] = useState([
        { label: 'Visible', value: true },
        { label: 'Not visible', value: false }
    ])

    const handleCancel = event => {
        event.preventDefault()

        onCancel()
    }

    const handleUpdateMission = event => {
        event.preventDefault()

        try {
            updateMission(missionId, imageValue, tittle, info, levelValue, difficultyValue, visibilityValue)
                .then(() => {
                    onMissionUpdated()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        try {
            retrieveMission(missionId)
                .then(mission => {
                    setMission(mission)
                    setDifficultyValue(mission.difficulty)
                    setImageValue(mission.image)
                    setLevelValue(mission.level)
                    setTittle(mission.tittle)
                    setInfo(mission.info)
                    setVisibilityValue(mission.visibility)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error)
        }
    }, [missionId])

    return (<>
        {mission && <View className="h-full w-full">
            <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
            <View className="items-center _justify-between m-4 h-5/6">
                <View className="w-full">
                    <Text className="text-white font-semibold text-xl">Mission tittle:</Text>
                    <TextInput className="w-full h-12 border bg-white rounded-md"
                        placeholder="tittle"
                        defaultValue={mission.tittle}
                        onChangeText={newTittle => (setTittle(newTittle))}
                    />
                </View>
                <View className="mt-2" style={{ zIndex: imageOpen ? 10 : 1 }}>
                    <Text className="text-white font-semibold text-xl">Mission image:</Text>
                    <DropDownPicker
                        open={imageOpen}
                        value={imageValue}
                        items={imageItems}
                        setOpen={setImageOpen}
                        setValue={setImageValue}
                        setItems={setImageItems}
                    />
                </View>
                <View className="mt-2" style={{ zIndex: levelOpen ? 10 : 1 }}>
                    <Text className="text-white font-semibold text-xl">Mission level:</Text>
                    <DropDownPicker
                        open={levelOpen}
                        value={levelValue}
                        items={levelItems}
                        setOpen={setLevelOpen}
                        setValue={setLevelValue}
                        setItems={setLevelItems}
                    />
                </View>
                <View className="mt-2" style={{ zIndex: difficultyOpen ? 10 : 1 }}>
                    <Text className="text-white font-semibold text-xl">Mission difficulty:</Text>
                    <DropDownPicker
                        open={difficultyOpen}
                        value={difficultyValue}
                        items={difficultyItems}
                        setOpen={setDifficultyOpen}
                        setValue={setDifficultyValue}
                        setItems={setDifficultyItems}
                    />
                </View>
                <View className="mt-2 w-full">
                    <Text className="text-white font-semibold text-xl">Mission info:</Text>
                    <TextInput className="w-full h-12 bg-white rounded-md border"
                        defaultValue={mission.info}
                        placeholder="info"
                        onChangeText={newInfo => (setInfo(newInfo))}
                    />
                </View>
                <View className="mt-2" style={{ zIndex: visibilityOpen ? 10 : 1 }}>
                    <Text className="text-white font-semibold text-xl">Mission visibility:</Text>
                    <DropDownPicker
                        open={visibilityOpen}
                        value={visibilityValue}
                        items={visibilityItems}
                        setOpen={setVisibilityOpen}
                        setValue={setVisibilityValue}
                        setItems={setVisibilityItems}
                    />
                </View>
            </View>
            <View className="h-20 w-full absolute bottom-0 items-center flex-row justify-around">
                <TouchableOpacity className="flex flex-row items-center"
                    onPress={handleCancel}>
                    <Text className="text-2xl font-bold text-red-800">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row items-center"
                    onPress={handleUpdateMission}>
                    <Text className="text-2xl font-bold ">Update</Text>
                </TouchableOpacity>
            </View>
        </View>}
    </>
    )
}