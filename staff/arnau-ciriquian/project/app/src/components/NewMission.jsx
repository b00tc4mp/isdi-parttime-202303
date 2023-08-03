import { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DropDownPicker from 'react-native-dropdown-picker';

export default function NewMission() {
    const [image, setImage] = useState()
    const [tittle, setTittle] = useState('')
    const [info, setInfo] = useState('')
    const [level, setLevel] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [visibility, setVisibility] = useState('')

    //

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ])

    //

    return (
        <View className="h-full w-full">
            <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
            <View className="justify-around m-4 h-5/6 border-2">
                <DropDownPicker
                    className="w-50 h-5"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
                <TextInput className="w-60 h-8 bg-white rounded-md shadow-md shadow-black"
                    placeholder="tittle"
                    onChangeText={newTittle => (setTittle(newTittle))} />
                <TextInput className="w-60 h-8 bg-white rounded-md shadow-md shadow-black"
                    placeholder="info"
                    onChangeText={newInfo => (setInfo(newInfo))}
                />
            </View>
            <View className="h-20 w-full absolute bottom-0 items-center flex-row justify-around">
                <TouchableOpacity className="flex flex-row items-center">
                    <Text className="text-2xl font-bold text-red-800">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row items-center">
                    <Text className="text-2xl font-bold ">Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}