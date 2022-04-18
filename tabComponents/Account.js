import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Account() {
  return (
    <View style={AccountTabStyle.mainView}>
      <Text>Account</Text>
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
    },
})