import { loginUser } from '@/services/authService';
import { useAuthStore } from '@/store/AppStore';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ToastAndroid, Platform, Alert } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setCredentials } = useAuthStore(); // 👈 zustand theke setter function nilam

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Info', message);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      showToast('Please enter username and password');
      return;
    }

    try {
      setLoading(true);
      const userData = await loginUser({ username, password });

      if (userData.length > 0) {
        showToast('Login Successful 🎉');
        console.log('User Data:', userData);

        // ✅ Save to zustand
        setCredentials(username, password, ''); // pin empty ekhon, pore set hobe PIN screen e
        console.log('Credentials set in Zustand:', { username, password, pin: '' });

        // ✅ Navigate to PIN Set page
        router.replace('/auth/pinset/pinset');
      } else {
        showToast('No user data found.');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Login Failed ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15
  }
});
