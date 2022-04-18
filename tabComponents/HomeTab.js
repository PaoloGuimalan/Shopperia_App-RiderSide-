import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function HomeTab() {
  return (
    <View style={HomeTabStyle.mainView}>
      <Text>HomeTab New</Text>
    </View>
  )
}

const HomeTabStyle = StyleSheet.create({
    mainView:{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
})