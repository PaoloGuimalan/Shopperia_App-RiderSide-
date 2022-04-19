import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SET_TO_DELIVER } from '../redux/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_TWO } from '../localvars/localvars';
import Axios from 'axios';

export default function ToDeliver() {

  const riderID = useSelector(state => state.riderID);
  const todeliver = useSelector(state => state.todeliver);
  const dispatch = useDispatch();

  useEffect(() => {
    getToDeliverOrders()
  }, [riderID])

  const getToDeliverOrders = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
        Axios.get(`http://${URL_TWO}/toDeliver/${riderID}`, {
            headers:{
                "x-access-token": resp
            }
        }).then((response) => {
            dispatch({type: SET_TO_DELIVER, todeliver: response.data});
        }).catch((err) => {
            // alert(err);
        })
    })
  }

  return (
    <ScrollView style={ToDeliverStyle.mainView}>
      <Text style={ToDeliverStyle.labelText}>Orders to Deliver</Text>
      {todeliver.length > 0? (
          todeliver.map((items) => {
              return(
                  <View key={items.order_id} style={ToDeliverStyle.ordersView}>
                      <Image source={{uri: items.var_img.replace("localhost:3001", `${URL_TWO}`)}} style={ToDeliverStyle.ordersImage} />
                      <View style={ToDeliverStyle.detailsView}>
                        <Text style={ToDeliverStyle.detailsText}>{items.order_id}</Text>
                        <Text style={ToDeliverStyle.detailsText}>{items.receiver}</Text>
                        <Text style={ToDeliverStyle.detailsText}>{items.fulladdress}</Text>
                        <View style={ToDeliverStyle.buttonsView}>
                            <Text style={ToDeliverStyle.btnsOrderOne}>View</Text>
                            <Text style={ToDeliverStyle.btnsOrderTwo}>Delivered</Text>
                        </View>
                      </View>
                  </View>
              )
          })
      ) : (
          <Text style={ToDeliverStyle.warnlabel}>No Orders to Deliver</Text>
      )}
    </ScrollView>
  )
}

const ToDeliverStyle = StyleSheet.create({
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
        backgroundColor: "lime",
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
    }
})