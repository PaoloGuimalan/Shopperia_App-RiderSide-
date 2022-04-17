import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {

  const riderID = useSelector(state => state.riderID);

  return (
    <View style={styleHome.viewSizing}>
      <Text>Home Alone {riderID}</Text>
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