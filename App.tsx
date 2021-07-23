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
import store from './Redux/store'
import { Provider } from 'react-redux'
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

function App({ navigation }: any) {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  axios.defaults.baseURL = "https://fevu7x9mx0.execute-api.ap-southeast-1.amazonaws.com/RX"
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Accept'] = 'application/json';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'true'
  // axios.defaults.headers.post['Authorization'] = getAccessToken()

  const queryClient = new QueryClient()

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StripeProvider
            publishableKey="pk_test_51JBk9SGpYsfVxlCs9sXM5aEpCKsV210O2EzYZMxlDVdIrmCpc1HKYqVanJoUk1Sz06rNfdQvJz0dHMkFPIrKcjXi00YDmhfiee">
            <SafeAreaProvider>
              <NativeBaseProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </NativeBaseProvider>
            </SafeAreaProvider>
          </StripeProvider>
        </QueryClientProvider>
      </Provider>
    );
  }
}
export default App