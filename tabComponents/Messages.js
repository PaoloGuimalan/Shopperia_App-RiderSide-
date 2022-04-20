import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { URL_TWO } from '../localvars/localvars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_MESSAGES } from '../redux/types/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inbox from '../MessagesComponents/Inbox';

const Screener = createNativeStackNavigator();

export default function Messages() {

  const riderID = useSelector(state => state.riderID);
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();

  const [messagesScreen, setmessagesScreen] = useState(false);
  const [chatperson, setchatperson] = useState("");

  useEffect(() => {
   getMessages();
  }, [riderID]);

  const getMessages = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get(`http://${URL_TWO}/messagesRider/${riderID}`, {
        headers: {
          "x-access-token": resp
        }
      }).then((response) => {
        dispatch({type: SET_MESSAGES, setmessages: response.data});
      }).catch((err) => {
        //err catch
      })
    })
  }

  const MessagesList = () => {
    return(
      <ScrollView style={MessagesTabStyle.scrollViewStyle} contentContainerStyle={MessagesTabStyle.scrollViewContainer}>
        <Text style={MessagesTabStyle.labelMain}>Messages</Text>
        {messages.length == 0? (
          <Text style={MessagesTabStyle.warnlabel}>No Messages</Text>
        ):(
          messages.map((msgs) => {
            return(
              <View key={msgs.conversation_id} style={MessagesTabStyle.messagesPreview} onStartShouldSetResponder={() => {setmessagesScreen(true); setchatperson(msgs.from == riderID? msgs.to : msgs.from)}}>
                <Image source={{uri: `http://${URL_TWO}/profileImgs/Default_Male.jpg`}} style={MessagesTabStyle.imgSizing} />
                <View style={MessagesTabStyle.viewMessagesPrev}>
                  <Text style={MessagesTabStyle.msgsLabelUserName}>{msgs.from == riderID? msgs.to : msgs.from}</Text>
                  <Text style={MessagesTabStyle.msgsLabel}>{msgs.from == riderID? `you: ${msgs.message_content}` : msgs.message_content}</Text>
                </View>
              </View>
            )
          })
        )}
      </ScrollView>
    )
  }
  

  return (
    <View  style={MessagesTabStyle.mainView}>
      {messagesScreen == false? <MessagesList /> : <Inbox person={chatperson} />}
    </View>
  )
}

const MessagesTabStyle = StyleSheet.create({
    mainView:{
        flex: 1,
        flexDirection: 'column',
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    labelMain:{
      fontSize: 20,
      marginTop: 20,
      marginBottom: 20,
    },
    scrollViewStyle:{
        width: "100%",
        flex: 1,
        paddingBottom: 100,
    },
    scrollViewContainer:{
      alignItems: 'center',
    },
    warnlabel:{
      color: 'grey',
      textAlign: 'center',
      marginTop: 10,
    },
    messagesPreview:{
      flex: 1,
      flexDirection: 'row',
      width: "90%",
      maxWidth: 500,
      backgroundColor: "white",
      alignSelf: "center",
      padding: 5,
      maxHeight: 150,
      borderWidth: 1,
      minHeight: 100,
      borderColor: "#D3D3D3",
      borderRadius: 5,
      alignItems: "center",
    },
    imgSizing:{
      width: 80,
      height: 80,
      borderRadius: 80,
    },
    viewMessagesPrev:{
      padding: 5,
      paddingTop: 15,
      width: "70%",
    },
    msgsLabel:{
      color: "black",
      textAlign: 'left',
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 12,
    },
    msgsLabelUserName:{
      color: "black",
      textAlign: 'left',
      flex: 1,
      fontSize: 15,
      fontWeight: "bold",
      flexWrap: 'wrap',
    }
})