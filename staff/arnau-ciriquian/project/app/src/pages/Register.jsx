//import { authenticateUser } from "../logic/authenticateUser"
//import "./login.css"
//import { Form, ButtonForm, Container } from "../library"

/*import { Text, View, Image, Button } from "react-native"

export default function Register({onLoginClick}) {

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    // afegir compos personalitzats com el container, form, button, etc... '../library'
    return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Image source={require('../../assets/login/DreamShaper_v6_SCIFI_Fantasy_World_a_small_town_near_an_oasis_1.jpg')} style={{ position: 'absolute', height: '100%', left: -700 }}></Image>
        <View style={{
            width: 300,
            height: 500,
            backgroundColor: '#f2A337',
            opacity: 0.7,
            borderRadius: 20,
            justifyContent: "space-around",
            alignItems: 'center',
            shadowColor: '#171717',
            shadowOffset: { width: 4, height: 5},
            shadowOpacity: 0.8
        }}>
            <Image source={require('../../assets/login/slashing-sword.png')} style={{ height: 80, width: 80 }} />
            <Text >Register page</Text>
            <Button
                onPress={handleLoginClick}
                title="Login here!"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    </View>
}*/

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/login/slashing-sword.png')} style={styles.logo}></Image>
      </View>
      <View style={styles.page}>
        <Text style={styles.text}>Register</Text>
        <View style={styles.inputsBox}>
          <TextInput style={styles.formInput} placeholder="username" onChangeText={newName => (setName(newName))} />
          <TextInput style={styles.formInput} placeholder="email" onChangeText={newEmail => (setEmail(newEmail))} />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.formInput}
              secureTextEntry={true}
              placeholder="password"
              onChangeText={newPassword => (setPassword(newPassword))} 
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.formInput}
              secureTextEntry={true}
              placeholder="password confirmation"
              onChangeText={newPasswordConfirm => (setPasswordConfirm(newPasswordConfirm))} 
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Go to{' '}
          <TouchableOpacity onPress={handleLoginClick}>
            <Text style={styles.anchor}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  inputsBox: {
    width: '100%',
    marginBottom: 20,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    position: 'relative',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  anchor: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default Register;
