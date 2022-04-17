import { View, Text, TextInput, StyleSheet, Button, Image, ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react'
import LogoIcon from '../imgs/shopperia_logo.png';
import BackLogo from '../imgs/SHOPPERIA.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { URL_ONE } from '../../localvars/localvars';
import { useDispatch } from 'react-redux';
import { SET_RIDER_ID } from '../../redux/types/types';

export default function Login({navigation}) {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  const loginToggler = async () => {
    // navigation.navigate('Home');
    try{
      // await AsyncStorage.setItem('token', "sakjhds");
      Axios.post(`http://${URL_ONE}/loginRider`, {
          email: email,
          password: password
      }).then( async (response) => {
        // console.log(response.data);
        if(response.data.status){
          await setemail("");
          await setpassword("");
          await AsyncStorage.setItem('token', response.data.token);
          await dispatch({type: SET_RIDER_ID, riderID: response.data.riderID})
          navigation.navigate("Home");
        }
      }).catch((err) => {
        //handle err
      })
    }catch(error){
      //error
    }
  }

  const loginVerFunc = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get(`http://${URL_ONE}/loginriderverifier`, {
        headers:{
          "x-access-token": resp
        }
      }).then((response) => {
        // console.log(response.data);
        if(response.data.status){
          dispatch({type: SET_RIDER_ID, riderID: response.data.riderID});
          navigation.navigate("Home");
        }
      }).catch((err) => {
        //handle error
      })
    })
  }

  useEffect(() => {
    loginVerFunc();
  }, []);

  return (
    <ImageBackground source={BackLogo} blurRadius={10} resizeMode='cover' style={stylesForm.backgroundSizing}>
      <View style={stylesForm.viewSizing}>
        <Image source={LogoIcon} style={stylesForm.imageSizing} />
        <Text style={stylesForm.textSizing}>Login</Text>
        <TextInput style={stylesForm.inputBox} placeholder='Email' defaultValue={email} onChangeText={(e) => {setemail(e)}}></TextInput>
        <TextInput style={stylesForm.inputBox} placeholder='Password' secureTextEntry='true' defaultValue={password} onChangeText={(e) => {setpassword(e)}}></TextInput>
        <View style={stylesForm.buttonSizing}>
          <Button title='Log In' color='grey' onPress={() => loginToggler()}/>
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