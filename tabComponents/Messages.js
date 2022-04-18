import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Messages() {
  return (
    <View  style={MessagesTabStyle.mainView}>
      <Text>Messages</Text>
    </View>
  )
}

const MessagesTabStyle = StyleSheet.create({
    mainView:{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
})