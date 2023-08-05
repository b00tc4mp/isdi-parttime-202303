import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import Context from '../../AppContext.js'
import MapView, { Marker, Callout } from 'react-native-maps'
import DropDownPicker from 'react-native-dropdown-picker';

export default function Login({ navigation }) {
    const { currentView, setCurrentView, colorScheme } = useContext(Context)
    const [openType, setOpenType] = useState(false);
    const [typeValue, setTypeValue] = useState(null);
    const [typeItems, setTypeItems] = useState([
        { label: 'Slide', value: 'slide' },
        { label: 'Swing', value: 'swing' },
        { label: 'Double Swing', value: 'double-swing' },
        { label: 'Seesaw', value: 'seesaw' }
    ]);

    const [selectedType, setSelectedType] = useState();
    const [selectedAge, setSelectedAge] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const [selectedAccessibility, setSelectedAccessibility] = useState();

    const handleLogin = () => {
        alert('TODO login')
    }
    const handleForgetPassword = () => {
        alert('TODO Forget Password')
    }
    const handleGoToRegister = () => {
        alert('TODO Go To Register')
    }
    return <>
        <View className="flex-1 bg-black60  items-center justify-center z-50 absolute w-full h-full">
            <View className="bg-white dark:bg-gray-800 h-auto px-6 py-7 w-11/12 rounded-3xl">
                <Text className="dark:text-white text-xl font-semibold">Add element</Text>
                <Text className="dark:text-white pt-4 text-xs ">Type</Text>
                <DropDownPicker
                    listMode="FLATLIST"
                    mode="BADGE"

                    open={openType}
                    value={typeValue}
                    items={typeItems}
                    setOpen={setOpenType}
                    setValue={setTypeValue}
                    setItems={setTypeItems}
                />
                <Text className="dark:text-white pt-4 text-xs ">Age</Text>
                {/* <Picker
                    selectedValue={selectedType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedType(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <Text className="dark:text-white pt-3 text-xs ">Status</Text>
                <Picker
                    selectedValue={selectedType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedType(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <Text className="dark:text-white pt-3 text-xs ">Accessibility</Text>
                <Picker
                    selectedValue={selectedType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedType(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker> */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="border border-mainLime bg-mainLime rounded-full mb-1 mt-4 self-center w-auto  "
                    onPress={() => {
                        handleLogin()
                    }}
                >
                    <View
                        className="font-bold   px-6 py-2 self-center rounded-full"
                    >
                        <Text className="font-bold  text-lg   self-center rounded-full">Create account</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </>
}