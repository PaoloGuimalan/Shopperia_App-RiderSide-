import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Account({navigation}) {

  const buttonLogOut = () => {
    AsyncStorage.removeItem('token');
    navigation.navigate("Login");
  }

  return (
    <View style={AccountTabStyle.mainView}>
      <Text>Account</Text>
      <Text style={AccountTabStyle.logOutButton} onPress={() => {buttonLogOut()}} >Log Out</Text>
    </View>
  )
}

const AccountTabStyle = StyleSheet.create({
    mainView:{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: "100%",
    },
    logOutButton:{
        width: 200,
        height: 25,
        borderWidth: 1,
        textAlign: "center",
        backgroundColor: "red",
        borderColor: "grey",
        color: "white",
        paddingTop: 1 ,
        borderRadius: 5,
    },  
})