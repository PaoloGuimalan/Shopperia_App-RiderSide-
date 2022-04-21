import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { URL_TWO } from '../localvars/localvars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_RETRIEVED } from '../redux/types/types';

export default function HomeTab() {

  const riderID = useSelector(state => state.riderID);
  const riderbranch = useSelector(state => state.riderbranch);
  const retrieved = useSelector(state => state.retrieved);

  const [displaylist, setdisplaylist] = useState("Picked Up");

  const dispatch = useDispatch();

  useEffect(() => {
    retrievedHistoryGetter()
  }, [riderID]);

  const retrievedHistoryGetter = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get(`http://${URL_TWO}/retrievedHistory/${riderID}`, {
        headers: {
          "x-access-token": resp
        }
      }).then((response) => {
        dispatch({type: SET_RETRIEVED, retrieved: response.data});
      }).catch((err) => {
        //catch err
      })
    })
  }

  return (
    <ScrollView style={HomeTabStyle.mainView} contentContainerStyle={HomeTabStyle.mainViewScroll}>
      <View style={HomeTabStyle.mapView}>
        <Text>HomeTab New asd {riderID} | {riderbranch}</Text>
      </View>
      <View style={HomeTabStyle.detailsView}>
        <View style={HomeTabStyle.navigationsViewDetails}>
          <Text style={HomeTabStyle.btnsDetails} onPress={() => {setdisplaylist("Picked Up")}}>Picked Up</Text>
          <Text style={HomeTabStyle.btnsDetailsTwo} onPress={() => {setdisplaylist("Delivered")}}>Delivered</Text>
        </View>
        <ScrollView style={HomeTabStyle.detailsScrollView} contentContainerStyle={HomeTabStyle.detailsScrollViewScrollStyle}>
          <Text style={HomeTabStyle.detailsTextListTwo}>{displaylist}</Text>
          {retrieved.length == 0? (
            <Text style={HomeTabStyle.warnlabel}>No Retrieved Parcels Yet</Text>
          ) : (
            retrieved.map((items) => {
              return(
                <View key={`${items.order_id}${items.order_status}`} style={HomeTabStyle.viewList}>
                  <Text style={HomeTabStyle.detailsTextList}>{items.order_id}</Text>
                  <Text style={HomeTabStyle.detailsTextListTwo}>{items.date_made}</Text>
                </View>
              )
            })
          )}
          <Text style={HomeTabStyle.bottomText}>...</Text>
        </ScrollView>
      </View>
    </ScrollView>
  )
}

const HomeTabStyle = StyleSheet.create({
    mainView:{
        backgroundColor: "white",
    },
    mainViewScroll:{
      flex: 1,
      flexDirection: 'column',
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    mapView:{
        width: "100%",
        height: "65%",
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsView:{
      width: "100%",
      height: "35%",
      backgroundColor: "white",
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: "#D3D3D3",
      flex: 1,
      flexDirection: 'column',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    navigationsViewDetails:{
      flex: 1,
      flexDirection: 'row',
      backgroundColor: "white",
      maxHeight: 50,
      minHeight: 50,
    },
    btnsDetails:{
      borderWidth: 1,
      height: 30,
      margin: 5,
      marginTop: 10,
      width: 100,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderColor: "orange",
      color: "white",
      borderRadius: 5,
      backgroundColor: 'orange',
    },
    btnsDetailsTwo:{
      borderWidth: 1,
      height: 30,
      margin: 5,
      marginTop: 10,
      width: 100,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderColor: "lime",
      color: "white",
      borderRadius: 5,
      backgroundColor: 'lime',
    },
    detailsScrollView:{
      borderColor: "grey",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      width: "90%",
      maxWidth: 400,
      marginBottom: 0,
      paddingBottom: 0,
    },
    detailsScrollViewScrollStyle:{
      alignItems: 'center',
    },
    bottomText:{
      marginBottom: 100,
    },
    warnlabel:{
      color: 'grey',
      textAlign: 'center',
      marginTop: 10,
    },
    viewList:{
      flex: 1,
      flexDirection: 'row',
      width: "100%",
      alignSelf: 'center',
      borderBottomWidth: 1,
      borderBottomColor: "grey",
    },
    detailsTextList:{
      flex: 1,
      margin: 5,
      color: "grey",
      backgroundColor: "white",
    },
    detailsTextListTwo:{
      flex: 1,
      margin: 5,
      color: "grey",
      backgroundColor: "white",
      textAlign: 'center',
    }
})