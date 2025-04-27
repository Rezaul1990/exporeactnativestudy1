import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState(); // 👈 এইটা নিতে হবে

  useEffect(() => {
    if (!rootNavigationState?.key) {
      // 👉 Root navigation এখনও ready হয়নি
      return;
    }

    // ✅ এখন safe হয়ে router.replace করতে পারি
    router.replace('/auth/login/login');
  }, [rootNavigationState]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
