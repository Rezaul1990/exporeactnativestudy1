import { ClubUser } from '@/model/ClubUser';
import { getProfileData } from '@/services/userClubService';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/store/AppStore';
import { getCombinedData } from '@/services/combinedDataService';
import { router } from 'expo-router';

export default function ProfileSelect() {
  const [siblings, setSiblings] = useState<ClubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<ClubUser | null>(null);

  const { setSelectedUser: storeSelectedUser, userId, clubId } = useAuthStore(); // zustand hooks
  const navigation = useNavigation(); 

  useEffect(() => {
    (async () => {
      try {
        const result = await getProfileData();
        setSiblings(result);
      } catch (err) {
        console.error('[DEBUG] Controller error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSelect = (user: ClubUser) => {
    setSelectedUser(user);
    console.log('[DEBUG] Selected UserID:', user.UserID);
  };

  const handleGoToDashboard = async () => {
    if (selectedUser) {
      storeSelectedUser(selectedUser.UserID, selectedUser.ClubID);

      try {
        console.log('[DEBUG] Fetching Dashboard data...');
        const dashboardData = await getCombinedData(selectedUser.ClubID, selectedUser.UserID);
        router.replace('/screens/dashboard/Dashboard');
      } catch (error) {
        console.error('[DEBUG] Dashboard API Error:', error);
      }
    } else {
      console.warn('No user selected!');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0078D7" />
        <Text style={styles.loadingText}>Loading siblings...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={siblings}
        keyExtractor={(item) => item.UserID.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedUser?.UserID === item.UserID;
          return (
            <TouchableOpacity
              style={[styles.item, isSelected && styles.selectedItem]}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.name}>
                {item.FirstName} {item.LastName}
              </Text>
              <Text style={styles.details}>Role: {item.RoleName}</Text>
              <Text style={styles.details}>Club: {item.ClubName}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Dashboard"
          onPress={handleGoToDashboard}
          disabled={!selectedUser}
          color="#0078D7"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F9FF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
  },
  selectedItem: {
    backgroundColor: '#D0E8FF',
    borderWidth: 2,
    borderColor: '#0078D7',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
});
