import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { URL_TWO } from '../localvars/localvars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_TO_RETRIEVE } from '../redux/types/types';

export default function ToRetrieve() {

  const riderID = useSelector(state => state.riderID);
  const toretrieve = useSelector(state => state.toretrieve);
  const dispatch = useDispatch();

  useEffect(() => {
    getToRetrieveOrders()
  }, [riderID])

  const getToRetrieveOrders = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
        Axios.get(`http://${URL_TWO}/toRetrieve/${riderID}`, {
            headers:{
                "x-access-token": resp
            }
        }).then((response) => {
            dispatch({type: SET_TO_RETRIEVE, toretrieve: response.data});
        }).catch((err) => {
            //catch err
        })
    })
  }

  return (
    <ScrollView style={ToRetrieveStyle.mainView}>
      <Text style={ToRetrieveStyle.labelText}>Orders to Retrieve</Text>
      {toretrieve.length > 0? (
          toretrieve.map((items) => {
              return(
                  <View key={items.order_id} style={ToRetrieveStyle.ordersView}>
                      <Image source={{uri: items.var_img.replace("localhost:3001", `${URL_TWO}`)}} style={ToRetrieveStyle.ordersImage} />
                      <View style={ToRetrieveStyle.detailsView}>
                        <Text style={ToRetrieveStyle.detailsText}>{items.order_id}</Text>
                        <Text style={ToRetrieveStyle.detailsText}>{items.receiver}</Text>
                        <Text style={ToRetrieveStyle.detailsText}>{items.fulladdress}</Text>
                        <View style={ToRetrieveStyle.buttonsView}>
                            <Text style={ToRetrieveStyle.btnsOrderOne}>View</Text>
                            <Text style={ToRetrieveStyle.btnsOrderTwo}>Retrieved</Text>
                        </View>
                      </View>
                  </View>
              )
          })
      ) : (
          <Text style={ToRetrieveStyle.warnlabel}>No Orders to Retrieve</Text>
      )}
    </ScrollView>
  )
}

const ToRetrieveStyle = StyleSheet.create({
    mainView:{
        width: "100%",
        flex: 1,
        paddingBottom: 100,
    },
    labelText:{
        fontSize: 20,
        marginTop: 15,
        textAlign: "center",
        marginBottom: 15,
    },
    textContent:{
        fontSize: 40,
    },
    ordersView:{
        flex: 1,
        flexDirection: 'row',
        width: "90%",
        maxWidth: 500,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: "white",
        alignSelf: "center",
        margin: 5,
    },
    ordersImage:{
        width: 100,
        height: "100%",
    },
    detailsView:{
        flex: 1,
        padding: 5,
    },
    detailsText:{
        fontSize: 12,
        flex: 1,
        flexWrap: 'wrap',
        marginTop: 5,
    },
    buttonsView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopWidth: 1,
        paddingTop: 5,
        marginTop: 5,
    },
    btnsOrderOne:{
        backgroundColor: "white",
        width: "45%",
        height: 35,
        margin: 2,
        textAlignVertical: 'center',
        textAlign: 'center',
        borderWidth: 1,
    },
    btnsOrderTwo:{
        backgroundColor: "orange",
        color: "white",
        width: "45%",
        height: 35,
        margin: 2,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    warnlabel:{
        color: 'grey',
        textAlign: 'center',
        marginTop: 10,
    },
})