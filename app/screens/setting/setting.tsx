// src/screens/SettingsScreen.tsx
import React from 'react';
import { View, Button, Text, Touchable, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/store/AppStore';
import { useCombinedDataStore } from '@/store/AppStore';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const SettingsScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  const resetCombinedData = useCombinedDataStore((state) => state.resetCombinedData);
  const navigation = useNavigation();

  const handleLogout = () => {
    // Log the state before logout to check the data
    console.log('[DEBUG] Before Logout - Auth Store:', useAuthStore.getState());
    console.log('[DEBUG] Before Logout - Combined Data Store:', useCombinedDataStore.getState());

    // Call the logout and reset functions
    logout();
    resetCombinedData();  // Clear combined data as well

    // Log the state after logout to verify it is cleared
    console.log('[DEBUG] After Logout - Auth Store:', useAuthStore.getState());
    console.log('[DEBUG] After Logout - Combined Data Store:', useCombinedDataStore.getState());

    // Navigate back to the login screen
    router.replace('/auth/login/login'); // Adjust the path as needed
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
      <Button title="Logout" onPress={handleLogout} />
      <TouchableOpacity onPress={() => router.replace('/auth/pinset/pinset')}>
        <Text>Go to Profile change</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
