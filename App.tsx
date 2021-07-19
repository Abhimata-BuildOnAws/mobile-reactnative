import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StripeProvider } from '@stripe/stripe-react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { NativeBaseProvider } from 'native-base';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StripeProvider
        publishableKey="pk_test_51JBvOFLmsrGgzr4MAJJI8NdCOlopKegG8NZMMAPpEgKezyiow5J6FOvh7xH7roRoR5rZKd70B4LoadeB4CPVpU1d00PLqAqVdV">
        <SafeAreaProvider>
          <NativeBaseProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </StripeProvider>
    );
  }
}
export default App;