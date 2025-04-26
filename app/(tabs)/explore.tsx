import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const explore = () => {
  return (
    <View style={{ paddingTop: 50 }}>
      <Text>explore</Text>
      <Button
        title="Go to setting"
        onPress={() => router.push('/screens/setting/setting')}
      />
    </View>
  )
}

export default explore

const styles = StyleSheet.create({})