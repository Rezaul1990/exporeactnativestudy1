import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCombinedDataStore } from '@/store/AppStore';

const Dashboard = () => {
// Accessing the combined data globally from Zustand
const combinedData = useCombinedDataStore((state) => state.combinedData);

if (!combinedData) {
  return <Text>Loading...</Text>;
}

return (
    <View>
        <Text>Member Count: {combinedData.MemberCount}</Text>
        <Text>Coach Count: {combinedData.CoachCount}</Text>
        <Text>Subscribed: {combinedData.Subscribed ? 'Yes' : 'No'}</Text>

        <Button
        title="Go to Seven Days Classes"
        onPress={() => {
            // Navigate or handle SevenDaysClasses as needed
            console.log(combinedData.SevenDaysClasses);
        }}
        />
    </View>
    );
}

export default Dashboard

const styles = StyleSheet.create({})