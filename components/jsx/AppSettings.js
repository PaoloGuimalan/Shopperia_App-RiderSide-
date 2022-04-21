import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL_THREE } from '../../localvars/localvars';

export default function AppSettings() {

  const [serverIP, setserverIP] = useState("");
  const [inputserver, setinputserver] = useState("");

  useEffect(() => {
    serverToken();
  }, [serverIP]);

  const serverToken = async () => {
    await AsyncStorage.getItem('server').then((resp) => {
        setserverIP(resp);
    })
  }

  const saveServerBtn = () => {
      AsyncStorage.setItem('server', inputserver);
  }

  return (
    <View style={AppSettingsStyle.mainView}>
      <Text>{serverIP}</Text>
      <Text>Set Server IP and Port</Text>
      <TextInput style={AppSettingsStyle.textInputSizing} placeholder='example: 192.168.0.155:3001' defaultValue={inputserver} onChangeText={(e) => {setinputserver(e)}} ></TextInput>
      <Button title='Save Server' color="grey" onPress={() => {saveServerBtn()}} />
    </View>
  )
}

const AppSettingsStyle = StyleSheet.create({
    mainView:{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    textInputSizing:{
        width: 300,
        height: 30,
        borderColor: "grey",
        borderWidth: 2,
        textAlign: "center",
        marginBottom: 10,
    }
})