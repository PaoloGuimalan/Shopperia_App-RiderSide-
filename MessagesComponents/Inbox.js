import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { URL_TWO } from '../localvars/localvars';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_INBOX } from '../redux/types/types';

export default function Inbox({route, navigation}) {

  const { user } = route.params;

  const riderID = useSelector(state => state.riderID);
  const inbox = useSelector(state => state.inbox);
  const dispatch = useDispatch();

  const [messageValue, setmessageValue] = useState("");
  const [loader, setloader] = useState(false);

  const [loadingLabel, setloadingLabel] = useState(true);

  useEffect(() => {
    messagesGetter();
  }, [riderID, inbox]);

  const messagesGetter = async () => {
    AsyncStorage.getItem('token').then((resp) => {
      Axios.get(`http://${URL_TWO}/messagesRiderInbox/${riderID}/${user}`, {
        headers:{
          "x-access-token": resp
        }
      }).then((response) => {
        if(response.data){
          dispatch({type: SET_INBOX, inbox: response.data});
          setloadingLabel(false);
        }
      }).catch((err) => {
        //catch error
      })
    })
  }

  const messageSender = async () => {
    // alert(messageValue);
    if(messageValue == "" || messageValue == null){
      alert("No message to send!");
    }
    else{
      await AsyncStorage.getItem('token').then((resp) => {
        Axios.post(`http://${URL_TWO}/sendMessageRider`, {
          message_content: messageValue,
          from: riderID,
          to: user,
        }, {
          headers:{
            "x-access-token": resp
          }
        }).then((response) => {
          if(response.data.status){
            setloader(!loader);
            setmessageValue("");
          }
        }).catch((err) => {
          //catch err
        })
      })
    }
  }

  return (
    <View style={InboxStyle.mainView}>
      <View style={InboxStyle.navView}>
        <Text style={InboxStyle.backText} onPress={() => {navigation.navigate('MessagesTab')}}><Ionicons name='arrow-back' style={{fontSize: 30}} /></Text>
        <View style={InboxStyle.navDetailsView}>
          <Image source={{uri: `http://${URL_TWO}/profileImgs/Default_Male.jpg`}} style={InboxStyle.imgSizing} />
          <Text style={InboxStyle.nameLabel}>{user}</Text>
        </View>
      </View>
      <ScrollView style={InboxStyle.scrollStyle}>
        {loadingLabel? (
          <Text style={InboxStyle.warnlabel}>{loadingLabel? "Loading Messages..." : "No Messages"}</Text>
        ) : (
          inbox.length == 0? (
            <Text style={InboxStyle.warnlabel}>{loadingLabel? "Loading Messages..." : "No Messages"}</Text>
          ) : (
            inbox.map((msgs) => {
              return(
                <Text style={msgs.from == riderID? InboxStyle.meUser : InboxStyle.otherUser} key={`${msgs.message_content}${msgs.conversation_id}${msgs.id}`}>{msgs.message_content}</Text>
              )
            })
          )
        )}
      </ScrollView>
      <View style={InboxStyle.sendView}>
        <Text style={InboxStyle.btnIcons}><Ionicons name='image' style={{fontSize: 20}} /></Text>
        <Text style={InboxStyle.btnIcons}><Ionicons name='videocam' style={{fontSize: 20}} /></Text>
        <Text style={InboxStyle.btnIcons}><Ionicons name='camera' style={{fontSize: 20}} /></Text>
        <TextInput placeholder='Type your message' style={InboxStyle.messageBox} defaultValue={messageValue} onChangeText={(e) => {setmessageValue(e)}} />
        <Text style={InboxStyle.btnIcons} onPress={() => {messageSender()}}><Ionicons name='send' style={{fontSize: 20}} /></Text>
      </View>
    </View>
  )
}

const InboxStyle = StyleSheet.create({
  mainView:{
    flex: 1,
    height: "100%",
    alignItems: 'center',
    flexDirection: 'column',
  },
  warnlabel:{
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  },
  navView:{
    alignItems: 'center',
    width: "100%",
    height: 60,
    maxHeight: 60,
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    padding: 10,
  },
  backText:{
    position: 'absolute',
    width: 60,
    height: 60,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  imgSizing:{
    width: 50,
    height: 50,
    borderRadius: 60,
    alignSelf: 'center',
  },
  navDetailsView:{
    flex: 1,
    flexDirection: 'row',
    height: "100%",
    justifyContent: 'center',
  },
  nameLabel:{
    textAlignVertical: 'center',
    padding: 5,
  },
  sendView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: 60,
    maxHeight: 60,
    borderTopWidth: 1,
    borderTopColor: "#D3D3D3",
    bottom: 0,
    flexDirection: 'row',
  },
  scrollStyle:{
    width: "100%",
    flex: 1,
    paddingTop: 0,
  },
  meUser:{
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    borderColor: 'blue',
    borderWidth: 1,
    margin: 5,
    padding: 10,
    color: 'white',
    borderRadius: 10,
    width: 'auto',
    maxWidth: 250,
  },
  otherUser:{
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    margin: 5,
    padding: 10,
    color: 'blue',
    borderRadius: 10,
    width: 'auto',
    maxWidth: 250,
  },
  messageBox:{
    borderWidth: 0,
    height: "70%",
    width: "60%",
    borderRadius: 100,
    backgroundColor: "lightgrey",
    padding: 10,
  },
  btnIcons:{
    height: "100%",
    width: "10%",
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})