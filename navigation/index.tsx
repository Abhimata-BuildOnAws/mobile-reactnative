/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import Payment from '../screens/payment/Payment';
import { RootStackParamList, PaymentStackParamList } from '../types';
import HomeNavigator from './HomeNavigator';
import OrderNavigator from './OrderNavigator';
import TumpangNavigator from './TumpangNavigator';
import UserManagementNavigator from './UserManagementNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
const PaymentStack = createStackNavigator<PaymentStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserManagement" component={UserManagementNavigator} />
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen name="Payment" component={PaymentNavigator} />
      <Stack.Screen name="Order" component={OrderNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const PaymentNavigator = () => {
  return (
    <PaymentStack.Navigator>
      <PaymentStack.Screen name="Payment" component={Payment} />
    </PaymentStack.Navigator>
  )
}
