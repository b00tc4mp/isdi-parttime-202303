import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { registerUser } from '../logic/registerUser.js';
import { useState } from 'react';

const Register = ({ onLoginClick, onUserRegistered }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleLoginClick = () => {
    onLoginClick();
  };

  const handleRegister = () => {
    try {
      registerUser(name, email, password, passwordConfirm)
        .then(() => onUserRegistered())
        .catch(error => Alert.alert('Error', error.message));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (<View className="flex justify-center items-center h-screen w-screen">
    <Image source={require('../../assets/login-register/log-reg-bg.jpg')} className="absolute scale-75 -bottom-40 -right-40" ></Image>
    <View className="bg-neutral-500 rounded-3xl opacity-70 w-80 h-4/5 absolute shadow-md shadow-black"></View>
    <View className="rounded-3xl w-80 h-4/5 flex justify-center items-center">
      <View className="flex justify-center items-center w-80 h-1/3">
        <Image source={require('../../assets/generic/logo-face.png')} className="h-40 w-40" />
        <Text className="absolute -bottom-4 text-5xl font-semibold shadow-md shadow-orange-500" >Login</Text>
      </View>
      <View className="w-80 h-2/3 flex justify-between p-5 items-center">
        <View className="flex justify-around items-center w-80 h-4/5">
          <View className="flex justify-around items-center w-80 h-2/3">
            <TextInput
              className="w-60 h-8 bg-white rounded-md shadow-md shadow-black"
              placeholder="username"
              onChangeText={newName => (setName(newName))}
            />
            <TextInput
              className="w-60 h-8 bg-white rounded-md shadow-md shadow-black"
              placeholder="email"
              onChangeText={newEmail => (setEmail(newEmail))}
            />
            <TextInput
              className="w-60 h-8 bg-white rounded-md shadow-md shadow-black"
              secureTextEntry={true}
              placeholder="password"
              onChangeText={newPassword => (setPassword(newPassword))}
            />
            <TextInput
              className="w-60 h-8 bg-white rounded-md shadow-md shadow-black"
              secureTextEntry={true}
              placeholder="password confirmation"
              onChangeText={newPasswordConfirm => (setPasswordConfirm(newPasswordConfirm))}
            />
          </View>
          <TouchableOpacity className="border-2 border-red-400 bg-orange-400 opacity-80 rounded-xl w-1/3 items-center shadow-xl" onPress={handleRegister}>
            <Text className="opacity-100 text-xl">Register!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="w-80 flex items-center" onPress={handleLoginClick}>
          <Text className="text-xl text-white">Already registered? Login here!</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
};

const styles = StyleSheet.create({

  formInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
});

export default Register;
