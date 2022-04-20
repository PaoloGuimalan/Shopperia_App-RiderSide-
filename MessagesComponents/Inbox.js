import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

export default function Inbox({person}) {

  const riderID = useSelector(state => state.riderID);

  return (
    <View>
      <Text>Inbox | {person}</Text>
    </View>
  )
}