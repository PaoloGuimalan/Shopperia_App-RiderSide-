import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

export default function HomeTab() {

  const riderID = useSelector(state => state.riderID);

  return (
    <View style={HomeTabStyle.mainView}>
      <Text>HomeTab New {riderID}</Text>
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