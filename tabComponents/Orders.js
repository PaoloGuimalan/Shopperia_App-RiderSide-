import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Orders() {
  return (
    <View style={OrdersTabStyle.mainView}>
      <Text>Orders</Text>
    </View>
  )
}

const OrdersTabStyle = StyleSheet.create({
    mainView:{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
})