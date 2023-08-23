import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import getUserCharacter from '../logic/getUserCharacter.js'

export default function TutorialInfo() {
    return (
        <View className="flex justify-around items-center h-5/6 w-full p-2">
            <View className="bg-neutral-500 rounded-3xl opacity-70 w-full h-full absolute shadow-md shadow-black"></View>
            <Text className="text-xl font-semibold text-center text-white m-2 mt-4">
                Great! Now that the introductions are complete, you need to travel to the extraction point. Brace yourself, survivor! Beware of the lurking zombies scattered in your path. Equip yourself and tap the screen to eliminate the undead threat. Your brain is on the menu, so don't let them get too close! Best of luck, and may your survival instincts prevail! We'll pick you up at your arrival!
            </Text>
            <Text className="text-xl font-semibold text-center text-white m-2">
                (Remember, Infected Reality is designed for outdoor gameplay. Ensure you have a strong GPS signal, stay mindful of your surroundings, respect fellow players and private properties, and be prepared for changing weather conditions.)
            </Text>
            <TouchableOpacity className="border-2 border-red-400 bg-orange-400 opacity-80 rounded-xl w-1/3 items-center shadow-md shadow-black" >
                <Text className="opacity-100 text-xl">
                    Continue!
                </Text>
            </TouchableOpacity>
        </View>
    )
}
