import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import HomeTab from '../../tabComponents/HomeTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from '../../tabComponents/Account';
import Orders from '../../tabComponents/Orders';
import Messages from '../../tabComponents/Messages';
import Settings from '../../tabComponents/Settings';

const Tab = createNativeStackNavigator();

export default function Home({navigation}) {

  const riderID = useSelector(state => state.riderID);

  const accountPress = () => {
    // alert("Hello Account");
    navigation.navigate("AccountTab");
  }

  const homePress = () => {
    navigation.navigate("HomeTab");
  }

  const ordersPress = () => {
    navigation.navigate("OrdersTab");
  }

  const messagesPress = () => {
    navigation.navigate("MessagesTab");
  }

  const settingsPress = () => {
    navigation.navigate("SettingsTab");
  }

  return (
    <View style={styleHome.viewSizing}>
      {/* <Text>Home Alone {riderID}</Text> */}
      <View style={styleHome.componentsView}>
        <Tab.Navigator>
          <Tab.Screen name='HomeTab' component={HomeTab} options={{ headerShown: false }} />
          <Tab.Screen name='AccountTab' component={Account} options={{ headerShown: false }} />
          <Tab.Screen name='OrdersTab' component={Orders} options={{ headerShown: false }} />
          <Tab.Screen name='MessagesTab' component={Messages} options={{ headerShown: false }} />
          <Tab.Screen name='SettingsTab' component={Settings} options={{ headerShown: false }} />
        </Tab.Navigator>
      </View>
      <View style={styleHome.bottomNavBar}>
        <Text style={styleHome.textNavBar}><Ionicons name='person' style={{fontSize: "30px"}} onPress={() => {accountPress()}} /></Text>
        <Text style={styleHome.textNavBar}><Ionicons name='cart' style={{fontSize: "30px"}} onPress={() => {ordersPress()}} /></Text>
        <Text style={styleHome.textNavBarMain}><Ionicons name='home' style={{fontSize: "40px"}} onPress={() => {homePress()}} /></Text>
        <Text style={styleHome.textNavBar}><Ionicons name='chatbubble-ellipses' style={{fontSize: "30px"}} onPress={() => {messagesPress()}} /></Text>
        <Text style={styleHome.textNavBar}><Ionicons name='settings' style={{fontSize: "30px"}} onPress={() => {settingsPress()}} /></Text>
      </View>
    </View>
  )
}

const styleHome = StyleSheet.create({
    componentsView:{
       width: "100%",
       height: "100%",
    },
    viewSizing:{
       flex: 1,
       width: "100%",
       height: "100%",
       alignItems: "center",
       justifyContent: "center",
    },
    bottomNavBar:{
      flex: 1,
      flexDirection: "row",
      width: "100%",
      height: "55px",
      position: "absolute",
      bottom: "0",
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
      justifyContent: "center",
    },
    textNavBar:{
      color: "white",
      backgroundColor: "black",
      justifyContent: "center",
      alignContent: "center",
      height: "100%",
      width: "20%",
      alignItems: "center",
      alignSelf: "center",
      paddingTop: "10px",
    },
    textNavBarMain:{
      color: "white",
      backgroundColor: "black",
      borderColor: "white",
      borderWidth: "3px",
      justifyContent: "center",
      alignContent: "center",
      height: "70px",
      width: "70px",
      alignItems: "center",
      alignSelf: "center",
      paddingTop: "10px",
      borderRadius: "100%",
      position: "relative",
      marginBottom: "30px",
    },
})