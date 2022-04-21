import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Settings() {
  return (
    <View style={SettingsTabStyle.mainView}>
      <Text>Settings</Text>
    </View>
  )
}

const SettingsTabStyle = StyleSheet.create({
    mainView:{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
})