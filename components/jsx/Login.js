import { View, Text, TextInput, StyleSheet, Button, Image, ImageBackground } from 'react-native'
import React from 'react'
import LogoIcon from '../imgs/shopperia_logo.png';
import BackLogo from '../imgs/SHOPPERIA.png';

export default function Login({navigation}) {
  return (
    <ImageBackground source={BackLogo} blurRadius={10} resizeMode='cover' style={stylesForm.backgroundSizing}>
      <View style={stylesForm.viewSizing}>
        <Image source={LogoIcon} style={stylesForm.imageSizing} />
        <Text style={stylesForm.textSizing}>Login</Text>
        <TextInput style={stylesForm.inputBox} placeholder='Email'></TextInput>
        <TextInput style={stylesForm.inputBox} placeholder='Password' secureTextEntry='true'></TextInput>
        <View style={stylesForm.buttonSizing}>
          <Button title='Log In' color='grey' onPress={() => navigation.navigate('Home')}/>
        </View>
      </View>
    </ImageBackground>
  )
}

const stylesForm = StyleSheet.create({
    inputBox: {
      width: "100%",
      height: 30,
      maxWidth: 300,
      borderWidth: 1,
      marginBottom: 5,
      borderRadius: 5,
      textAlign: "center",
      backgroundColor: "white",
      borderColor: "white",
    },
    viewSizing:{
       flex: 1,
       width: "100%",
       alignItems: "center",
       marginTop: "20vh",
    },
    textSizing:{
       fontSize: 20,
       fontFamily: "Arial",
       marginBottom: 20,
       fontWeight: "bold",
       color: "white"
    },
    buttonSizing:{
        marginTop: 10,
        width: 200,
        borderRadius: 5,
    },
    imageSizing:{
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    backgroundSizing:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      height: "100vh",
      width: "100vw",
      marginTop: "0px",
    }
  });