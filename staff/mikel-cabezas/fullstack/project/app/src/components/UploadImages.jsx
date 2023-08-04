import React, { useState, useEffect } from 'react';
import { View, Button, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { ADD, DELETE } from '../../assets/icons/index.js';

import { Asset } from 'expo-asset';

import { firebase } from '../config/firebase.js'
import { ref, uploadBytes } from 'firebase/storage'

// import Button from '../components/Button/';
// import Text from '../components/Text/';



export default function UploadImages() {
    const [ready, setReady] = useState(false);
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [imageResized, setImageResized] = useState(null);
    const [imagesResized, setImagesResized] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        console.log('loaded')
    }, [])

    useEffect(() => {
        console.log('images in local storage!')
    }, [imagesResized])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0]);

            const manipResult = await manipulateAsync(
                result.assets[0].uri,
                [{ resize: { height: 1000 } }],
                { compress: 0.5, format: SaveFormat.JPEG }
            );
            setImageResized(manipResult);

            setReady(true);
            result.assets[0].uri = manipResult.uri
            console.log('imageResized', imageResized)
            console.log('manipResult', manipResult)

        }
    }

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });
        if (!result.canceled) {
            try {
                setImage(result.assets[0]);
                result.assets.map(async image => {
                    const manipResult = await manipulateAsync(
                        image.uri,
                        [{ resize: { height: 1000 } }],
                        { compress: 0.5, format: SaveFormat.JPEG }
                    )
                    setImagesResized(current => [...current, manipResult]);
                })

                setReady(true);
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    const uploadImage = async () => {
        setUploading(true)
        // const response = await fetch(image.uri)
        const response = await fetch(imageResized.uri)
        const blob = await response.blob()
        const filename = imageResized.uri.substring(imageResized.uri.lastIndexOf('/') + 1)

        try {
            const { ref } = await firebase.storage().ref().child(filename).put(blob)
            const url = await ref.getDownloadURL()
            console.log(url)
        } catch (error) {
            console.log(error)
        }
        setUploading(false)

        alert('image uploaded')

        setImage(null)
    }
    const uploadImages = async () => {
        setUploading(true)
        const storedImagesUrl = []
        // const response = await fetch(image.uri)
        imagesResized.map(async image => {
            const response = await fetch(image.uri)
            const blob = await response.blob()
            const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)

            try {
                const { ref } = await firebase.storage().ref().child(filename).put(blob)
                const url = await ref.getDownloadURL()
                console.log(url)
                storedImagesUrl.push(url)
                console.log(storedImagesUrl)
            } catch (error) {
                console.log(error)
            }
        })
        setUploading(false)

        alert('All images uploaded!!!')

        setImage(null)
    }

    const deleteImage = (url) => {
        setImagesResized(current =>
            current.filter(image => {
                return image !== url;
            }),
        );
    }

    return (
        <>
            <View>
                <View className=" flex-row relative" >
                    <ScrollView horizontal className="pr-5">
                        <TouchableOpacity className="flex flex-col relative items-center justify-center w-[28vw] mr-3 h-36 rounded-2xl bg-mainGray last:mr-12" onPress={!imagesResized[0] ? pickImages : () => deleteImage(imagesResized[0])}>
                            {imagesResized[0] && <Image source={imagesResized[0]} className="mb-2 w-full h-36 rounded-2xl object-contain" />}
                            {imagesResized[0] && <Image className="w-8 h-8 mr-2 absolute left-auto bg-white rounded-lg" source={DELETE} />}
                            {!imagesResized[0] && <Image className="w-10 h-10 mr-2 absolute left-auto" source={ADD} />}
                        </TouchableOpacity>
                        <TouchableOpacity className="flex flex-col relative items-center justify-center w-[28vw] mr-3 h-36 rounded-2xl bg-mainGray last:mr-12" onPress={!imagesResized[1] ? pickImages : () => deleteImage(imagesResized[1])}>
                            {imagesResized[1] && <Image source={imagesResized[1]} className="mb-2 w-full h-36 rounded-2xl object-contain" />}
                            {imagesResized[1] && <Image className="w-8 h-8 mr-2 absolute left-auto bg-white rounded-lg" source={DELETE} />}
                            {!imagesResized[1] && <Image className="w-10 h-10 mr-2 absolute left-auto" source={ADD} />}
                        </TouchableOpacity>
                        <TouchableOpacity className="flex flex-col relative items-center justify-center w-[28vw] mr-3 h-36 rounded-2xl bg-mainGray last:mr-12" onPress={!imagesResized[2] ? pickImages : () => deleteImage(imagesResized[2])}>
                            {imagesResized[2] && <Image source={imagesResized[2]} className="mb-2 w-full h-36 rounded-2xl object-contain" />}
                            {imagesResized[2] && <Image className="w-8 h-8 mr-2 absolute left-auto bg-white rounded-lg" source={DELETE} />}
                            {!imagesResized[2] && <Image className="w-10 h-10 mr-2 absolute left-auto" source={ADD} />}
                        </TouchableOpacity>
                        <TouchableOpacity className="flex flex-col relative items-center justify-center w-[28vw] mr-3 h-36 rounded-2xl bg-mainGray last:mr-12" onPress={!imagesResized[3] ? pickImages : () => deleteImage(imagesResized[3])}>
                            {imagesResized[3] && <Image source={imagesResized[3]} className="mb-2 w-full h-36 rounded-2xl object-contain" />}
                            {imagesResized[3] && <Image className="w-8 h-8 mr-2 absolute left-auto bg-white rounded-lg" source={DELETE} />}
                            {!imagesResized[3] && <Image className="w-10 h-10 mr-2 absolute left-auto" source={ADD} />}
                        </TouchableOpacity>
                        <TouchableOpacity className="flex flex-col relative items-center justify-center w-[28vw] mr-3 h-36 rounded-2xl bg-mainGray last:mr-12" onPress={!imagesResized[4] ? pickImages : () => deleteImage(imagesResized[4])}>
                            {imagesResized[4] && <Image source={imagesResized[4]} className="mb-2 w-full h-36 rounded-2xl object-contain" />}
                            {imagesResized[4] && <Image className="w-8 h-8 mr-2 absolute left-auto bg-white rounded-lg" source={DELETE} />}
                            {!imagesResized[4] && <Image className="w-10 h-10 mr-2 absolute left-auto" source={ADD} />}
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                {/* {image && <>
                    <View className="flex justify-center w-full">
                        <Image source={{ uri: image.uri }} className="mx-auto w-48 h-48 border" />
                        {ready && image && _renderImage()}

                    </View>
                </>} */}
                {!uploading ? <Button title="Upload" onPress={uploadImages} /> : <ActivityIndicator size="large" />}

            </View>
        </>
    );
};
["https://firebasestorage.googleapis.com/v0/b/playgrounds-c6dfe.appspot.com/o/6AC8BA88-66E9-4883-8A8B-4781EC606F01.jpg?alt=media&token=ee33ae66-3ca6-4b54-af00-006ae153e58a", "https://firebasestorage.googleapis.com/v0/b/playgrounds-c6dfe.appspot.com/o/D61B1ECD-85BF-4708-BF40-0952A8EF5F82.jpg?alt=media&token=a604c4b6-eab7-494e-9be4-2e24181bde19", "https://firebasestorage.googleapis.com/v0/b/playgrounds-c6dfe.appspot.com/o/0B1E0B5A-DD33-4361-A224-50737D6B1103.jpg?alt=media&token=60d08961-ed00-4f33-a23a-2e498b7f83a5", "https://firebasestorage.googleapis.com/v0/b/playgrounds-c6dfe.appspot.com/o/258BBECA-A2FF-4574-AA4D-F82DE2205487.jpg?alt=media&token=92fb9906-6c8b-4440-a3e1-99c70d8c3712"]