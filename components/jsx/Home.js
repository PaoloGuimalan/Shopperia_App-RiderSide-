import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Home() {
  return (
    <View style={styleHome.viewSizing}>
      <Text>Home Alone</Text>
    </View>
  )
}

const styleHome = StyleSheet.create({
    viewSizing:{
       flex: 1,
       width: "100%",
       alignItems: "center",
       justifyContent: "center",
    },
})