import React, { useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import { DROPDOWN } from "../../../../assets/icons";

export default function AddElement({ onElementCreated, onCancelAddElement, id }) {
    const [modal, setModal] = useState()
    const [selectedType, setSelectedType] = useState();
    const [selectedAge, setSelectedAge] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const [selectedAccessibility, setSelectedAccessibility] = useState();

    const handleAdd = () => {
        try {
            if (!selectedType || !selectedAge || !selectedStatus || !selectedAccessibility || selectedType === 'Set element' || selectedAge === 'Set age' || selectedStatus === 'Set status' || selectedAccessibility === 'Set accessibility') {
                throw new Error('Complete all fields')
            }
            const element = { id, type: selectedType, age: selectedAge, status: selectedStatus, accessibility: selectedAccessibility }
            onElementCreated(element)
        } catch (error) {
            alert(error.message)
            console.log(error.message)
        }
    }
    const handleCancel = () => {
        onCancelAddElement()
    }

    const onElementType = () => {
        setModal('type')
    }
    const onElementAge = () => {
        setModal('age')
    }
    const onElementStatus = () => {
        setModal('status')
    }
    const onElementAccessibility = () => {
        setModal('accessibility')
    }
    const onCloseModal = () => {
        setModal()
    }

    return <>
        {modal && <View className="flex-1  bg-black60 items-center justify-center absolute w-[100vw] h-full z-[51] bottom-0 ">
            <TouchableOpacity activeOpacity="0.8" className="absolute bottom-[165px] rounded-lg bg-mainLime right-3.5 z-50">
                <Text className=" p-1.5 font-bold" onPress={onCloseModal}>OK</Text>
            </TouchableOpacity>
            {modal === 'type' && <Picker
                className="w-full bg-white h-56 text-bold rounded-[20px] absolute bottom-0 pb-[20px]"
                textColor="black"
                selectedValue='Set element'
                pickerData={['Set element', 'Slide', 'Swing', 'Double Swing', 'Seesaw', 'Rider', 'Sandbox', 'House', 'Climber']}
                onValueChange={label => { setSelectedType(label) }}
            />}
            {modal === 'age' && <Picker
                className="w-full bg-white h-52 text-bold rounded-[20px] absolute bottom-0 pb-[20px]"
                textColor="black"
                selectedValue='Set age'
                pickerData={['Set age', '+1', '+2', '+3', '+4', '+5', '+6']}
                onValueChange={label => { setSelectedAge(label) }}
            />}
            {modal === 'status' && <Picker
                className="w-full bg-white h-52 text-bold rounded-[20px] absolute bottom-0 pb-[20px]"
                textColor="Set status"
                pickerData={['Set status', 'Good', 'Acceptable', 'Warn', 'Dangerous']}
                onValueChange={label => { setSelectedStatus(label) }}
            />
            }
            {modal === 'accessibility' && <Picker
                className="w-full bg-white h-52 text-bold rounded-[20px] absolute bottom-0 pb-[20px]"
                textColor="Set accessibility"
                selectedValue={label => { setSelectedAccessibility(label) }}
                pickerData={['Set accessibility', 'Yes', 'No']}
                onValueChange={label => { setSelectedAccessibility(label) }}
            />}
        </View>}
        <View className="flex-1 bg-black60  items-center justify-center z-50 absolute w-full h-full">
            <View className="bg-white dark:bg-gray-800 h-auto px-6 py-7 w-11/12 rounded-3xl">
                <Text className="dark:text-white text-xl font-semibold">Add element</Text>
                <TouchableOpacity activeOpacity="0.8" onPress={onElementType}>
                    <Text className="dark:text-white pt-4 text-xs ">Type</Text>
                    <View className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full mt-1 mb-0 px-4 py-2 self-center w-full flex-row justify-between items-center" >
                        <Text className="flex-1" >{selectedType ? selectedType : 'Add element'}</Text>
                        <Image className="w-5 h-5 flex-2" source={DROPDOWN} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity="0.8" onPress={onElementAge}>
                    <Text className="dark:text-white pt-4 text-xs ">Age</Text>
                    <View className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full mt-1 mb-0 px-4 py-2 self-center w-full flex-row justify-between items-center" >
                        <Text className="flex-1" >{selectedAge ? selectedAge : 'Set age'}</Text>
                        <Image className="w-5 h-5 flex-2" source={DROPDOWN} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity="0.8" onPress={onElementStatus}>
                    <Text className="dark:text-white pt-4 text-xs ">Status</Text>
                    <View className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full mt-1 mb-0 px-4 py-2 self-center w-full flex-row justify-between items-center" >
                        <Text className="flex-1" >{selectedStatus ? selectedStatus : 'Set status'}</Text>
                        <Image className="w-5 h-5 flex-2" source={DROPDOWN} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity="0.8" onPress={onElementAccessibility}>
                    <Text className="dark:text-white pt-4 text-xs ">Accessibility</Text>
                    <View className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full mt-1 mb-0 px-4 py-2 self-center w-full flex-row justify-between items-center" >
                        <Text className="flex-1" >{selectedAccessibility ? selectedAccessibility : 'Set accessibility'}</Text>
                        <Image className="w-5 h-5 flex-2" source={DROPDOWN} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    className="border border-mainLime bg-mainLime rounded-full mt-4 self-center w-full  "
                    onPress={handleAdd} >
                    <View className="font-bold px-6 py-2 self-center rounded-full" >
                        <Text className="font-bold text-lg">Add</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="mt-4 self-center w-full"
                    onPress={handleCancel}
                >
                    <View className="px-6  self-center " >
                        <Text className="text-lg">Cancel</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </>
}