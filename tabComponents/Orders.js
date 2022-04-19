import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ToRetrieve from '../OrdersComponents/ToRetrieve';
import ToDeliver from '../OrdersComponents/ToDeliver';
import Axios from 'axios';

const Drawer = createNativeStackNavigator();

export default function Orders({navigation}) {

  const toRetrieveOrders = () => {
    navigation.navigate("ToRetrieve");
  }

  const [orderdisplay, setorderdisplay] = useState(false);

  return (
    <View style={OrdersTabStyle.mainView}>
      <View style={OrdersTabStyle.navigationsView}>
        <Text style={OrdersTabStyle.textBtnOne} onPress={() => {setorderdisplay(true)}} >To Retreive</Text>
        <Text style={OrdersTabStyle.textBtnTwo} onPress={() => {setorderdisplay(false)}} >To Deliver</Text>
      </View>
      <ScrollView contentContainerStyle={OrdersTabStyle.viewContentContainer} style={OrdersTabStyle.viewContent}>
        {/* <Drawer.Navigator initialRouteName='ToRetrieve'>
          <Drawer.Screen name='ToRetrieve' component={ToRetrieve} options={{ headerShown: false }} />
          <Drawer.Screen name='ToDeliver' component={ToDeliver} options={{ headerShown: false }} />
        </Drawer.Navigator> */}
        {!orderdisplay? <ToDeliver /> : <ToRetrieve />}
      </ScrollView>
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
    navigationsView:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "white",
        height: 70,
        width: "100%",
        position: "absolute",
        color: "white",
        justifyContent: "center",
        top: 0,
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    textBtnOne:{
      color: "white",
      backgroundColor: "orange",
      height: 40,
      margin: 5,
      width: 150,
      textAlign: "center",
      paddingTop: 8,
      borderRadius: 5
    },
    textBtnTwo:{
      color: "white",
      backgroundColor: "lime",
      height: 40,
      margin: 5,
      width: 150,
      textAlign: "center",
      paddingTop: 8,
      borderRadius: 5
    },
    viewContent:{
      flex: 1,
      backgroundColor: "white",
      width: "100%",
      marginTop: 70,
    },
    viewContentContainer:{
      justifyContent: "center",
      alignItems: "center",
    },
    textContent:{
      color: "black",
      fontSize: 40,
    }
})