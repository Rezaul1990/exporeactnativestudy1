import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import DotSection from './component/dotsection';
import Keypad from './component/keypad';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '@/store/AppStore';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = width / 5;
const HORIZONTAL_SPACING = 15;

export default function PinScreen() {
  const [pinArray, setPinArray] = useState(() => []);
  const { email, password, pin, setCredentials } = useAuthStore(); 

  const handlePress = (val) => {
    console.log('[DEBUG] Pressed:', val); // 👈 log the number here
    if (pinArray.length < 4) {
      setPinArray([...pinArray, val]);
    }
  };

  const handleBackspace = () => {
    if (pinArray.length > 0) {
      setPinArray(pinArray.slice(0, -1));
    }
  };

  const confirmPin = async () => {
    debugger; // 👈 This will trigger debugger tools if they're open
    const enteredPin = pinArray.join('');
  console.log('[DEBUG] Entered PIN:', enteredPin);
  console.log('[DEBUG] Stored PIN:', pin);

  if (enteredPin.length !== 4) {
    Toast.show({
      type: 'error',
      text1: 'Invalid PIN',
      text2: 'PIN must be 4 digits',
    });
    return;
  }

  if (pin && pin !== enteredPin) {
    // 👈 User already has a stored pin, and they entered the wrong one
    Toast.show({
      type: 'error',
      text1: 'Wrong PIN',
      text2: 'Please enter your current PIN to reset it.',
    });
    return;
  }

  // ✅ Either no pin existed before or it matched correctly
  setCredentials(email, password, enteredPin);
  // Log the stored PIN to verify
  console.log('[DEBUG] PIN stored in Zustand:', enteredPin);

  Toast.show({
    type: 'success',
    text1: 'PIN Set Successfully',
    text2: 'Your PIN has been saved!',
  });

  setTimeout(() => {
    router.replace('/auth/profileselect/profileselect'); // or wherever you want
  }, 500);
};
  

  

  return (
    <View style={[styles.container, { minHeight: '100%' }]}>
      <View style={{ width: '100%' }}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Ionicons name="leaf" size={36} color="#fff" style={styles.logo} />
      </View>
      <Text style={styles.title}>Pin.</Text>
      <Text style={styles.subtitle}>Create a pin number for faster log in</Text>
      <DotSection pinArray={pinArray} onBackspace={handleBackspace} />
      <Keypad onPress={handlePress} />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackspace}>
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => {
          console.log('[DEBUG] LOGIN button clicked');
          confirmPin();
        }}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      </View>
      <View style={styles.footerNoteContainer}>
        <Text style={styles.footerNote}>
          <Text style={styles.noteBold}>NOTE:</Text> Your pin is unique to your phone and not held by Coacha on our database.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    flexGrow: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,},
  header: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  logo: {
    backgroundColor: '#0078D7',
    padding: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',},
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',},
  dotWrapperSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#00FF66',
  },
  inactiveDot: {
    backgroundColor: '#99ccff',
  },
  crossButtonInline: {
    marginLeft: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
  },
  keypad: {
    marginTop: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: HORIZONTAL_SPACING,
    marginBottom: 15,
  },
  keyButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: HORIZONTAL_SPACING / 2,
  },
  keyButtonDisabled: {
    backgroundColor: 'transparent',
  },
  keyText: {
    fontSize: 24,
    color: '#003366',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  backButton: {
    width: '48%',
    backgroundColor: '#b3e0ff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButton: {
    width: '48%',
    backgroundColor: '#bfff00',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  backText: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerNoteContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
  },
  footerNote: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    flexShrink: 1,
    maxWidth: '90%',
  },
  noteBold: {
    fontWeight: 'bold',
  },
});
