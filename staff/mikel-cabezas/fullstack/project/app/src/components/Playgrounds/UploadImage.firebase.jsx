import React, { useState, useEffect } from 'react';
import { View, Button, Text, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { firebase } from '../config/firebase.js'
import { ref, uploadBytes } from 'firebase/storage'

// import Button from '../components/Button/';
// import Text from '../components/Text/';



export default function Upload() {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        // const source = { uri: result.uri }

        // setImage(source)

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        setUploading(true)
        // const response = await fetch(image.uri)
        const response = await fetch(image)
        const blob = await response.blob()
        const filename = image.substring(image.lastIndexOf('/') + 1)

        // const ref = firebase.storage().ref().child(filename).put(blob)

        try {

            const { ref } = await firebase.storage().ref().child(filename).put(blob)
            const url = await ref.getDownloadURL()
        } catch (error) {
            console.log(error)
        }
        setUploading(false)

        alert('image uploaded')

        setImage(null)
    }


    return (
        <>
            <View>
                <View className="w-full justify-center flex-row">
                    <Text className="text-center bg-mainLime p-2 mb-2" onPress={pickImage} >
                        Choose a picture
                    </Text>
                </View>
                {image && <>
                    <View className="flex justify-center w-full">
                        <Image source={{ uri: image }} className="mx-auto w-48 h-48" />
                    </View>
                </>}
                {!uploading ? <Button title="Upload" onPress={uploadImage} /> : <ActivityIndicator size="large" />}

            </View>
        </>
    );
};
