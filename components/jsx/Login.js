import { View, Text, TextInput, StyleSheet, Button, Image, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import LogoIcon from '../imgs/shopperia_logo.png';
import BackLogo from '../imgs/SHOPPERIA.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { URL_ONE, URL_THREE, URL_TWO } from '../../localvars/localvars';
import { useDispatch, useSelector } from 'react-redux';
import { SET_RIDER_BRANCH, SET_RIDER_ID, SET_SERVER } from '../../redux/types/types';
import { Ionicons } from '@expo/vector-icons';

export default function Login({navigation}) {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const serverrr = useSelector(state => state.server);

  const dispatch = useDispatch();

  const loginToggler = async () => {
    // navigation.navigate('Home');
    try{
      // await AsyncStorage.setItem('token', "sakjhds");
      Axios.post(`http://${URL_TWO}/loginRider`, {
          email: email,
          password: password
      }).then( async (response) => {
        // console.log(response.data);
        if(response.data.status){
          await setemail("");
          await setpassword("");
          await AsyncStorage.setItem('token', response.data.token);
          await dispatch({type: SET_RIDER_BRANCH, riderbranch: response.data.branch})
          await dispatch({type: SET_RIDER_ID, riderID: response.data.riderID})
          navigation.navigate("Home");
          alert("Logged In!");
        }
      }).catch((err) => {
        alert(err.message);
      })
    }catch(error){
      //error
    }
  }

  const loginVerFunc = async () => {
    if(serverrr != ""){
      await AsyncStorage.getItem('token').then((resp) => {
        Axios.get(`http://${URL_TWO}/loginriderverifier`, {
          headers:{
            "x-access-token": resp
          }
        }).then((response) => {
          // console.log(response.data);
          if(response.data.status){
            dispatch({type: SET_RIDER_BRANCH, riderbranch: response.data.branch})
            dispatch({type: SET_RIDER_ID, riderID: response.data.riderID});
            navigation.navigate("Home");
          }
        }).catch((err) => {
          //handle error
        })
      })
    }
  }

  useEffect(() => {
    loginVerFunc();
  }, [serverrr]);

  const appSettingsScreen = () => {
    navigation.navigate("AppSettings");
  }

  useEffect(() => {
    returnRespTrigger();
  }, [serverrr]);

  const returnRespTrigger = async () => {
    const savedServer = await URL_THREE();
    dispatch({type: SET_SERVER, server: savedServer});
  }

  return (
    <View style={stylesForm.backgroundSizing}>
      <Image source={BackLogo} style={stylesForm.imageSizing} />
      <Text style={stylesForm.floatsettings} onPress={() => {appSettingsScreen()}} ><Ionicons name='settings' style={{fontSize: 20 }}/></Text>
      <ScrollView contentContainerStyle={stylesForm.viewSizing}>
        <Text style={stylesForm.textSizing}>Login</Text>
        <TextInput style={stylesForm.inputBox} placeholder='Email' defaultValue={email} onChangeText={(e) => {setemail(e)}}></TextInput>
        <TextInput style={stylesForm.inputBox} placeholder='Password' secureTextEntry={true} defaultValue={password} onChangeText={(e) => {setpassword(e)}}></TextInput>
        <View style={stylesForm.buttonSizing}>
          <Button title='Log In' color='black' onPress={() => loginToggler()}/>
        </View>
      </ScrollView>
    </View>
  )
}

const stylesForm = StyleSheet.create({
    inputBox: {
      width: 300,
      height: 50,
      maxWidth: 300,
      borderWidth: 2,
      marginBottom: 5,
      borderRadius: 5,
      textAlign: "center",
      backgroundColor: "white",
      borderColor: "grey",
    },
    viewSizing:{
       flex: 1,
       width: "100%",
       alignItems: "center",
       marginTop: 0,
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
      width: "100%",
      height: "60%",
      marginBottom: 0,
      borderBottomLeftRadius: 350,
    },
    backgroundSizing:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      height: "100%",
      width: "100%",
      marginTop: 0,
      backgroundColor: "#606060",
    },
    floatsettings:{
        width: 40,
        height: 40,
        color: "white",
        position: "absolute",
        top: 10,
        left: 15,
    },
  });