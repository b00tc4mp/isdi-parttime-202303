import { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { createNewMission } from '../logic/createNewMission.js'

export default function CharacterCreator({ }) {
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

    const handleCreateNewMission = () => {
        try {
            createNewMission(imageValue, tittle, info, levelValue, difficultyValue, visibilityValue)
                .then(() => onMissionCreated())
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error)
        }
    }

    const handleCancelCreate = () => {
        onCancel()
    }

    return (
        <View className="flex justify-around items-center h-screen w-screen p-2">
            <Image source={require('../../assets/home/main-bg.jpg')} className="absolute scale-125 bottom-0" ></Image>
            <View className="h-20 flex-row items-center justify-center">
                <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                <View className="justify-center items-center h-16 w-2/4 mr-10">
                    <Text className=" text-2xl font-semibold">Hello, User!</Text>
                </View>
                <View className="justify-center items-center h-16 w-16 m-2 ml-10">
                    <TouchableOpacity>
                        <Image source={require('../../assets/generic/menu.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="h-3/4 w-full">
                <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                <View className="items-center _justify-between m-4 h-5/6">
                    <View className="w-full">
                        <Text className="text-white font-semibold text-xl">Character name:</Text>
                        <TextInput className="w-full h-12 border bg-white rounded-md"
                            placeholder="name"
                            onChangeText={newTittle => (setTittle(newTittle))}
                        />
                    </View>
                    
                    <View className="mt-2" style={{ zIndex: visibilityOpen ? 10 : 1 }}>
                        <Text className="text-white font-semibold text-xl">Avatar:</Text>
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
                    <TouchableOpacity className="flex flex-row items-center" onPress={handleCreateNewMission}>
                        <Text className="text-2xl font-bold ">Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}