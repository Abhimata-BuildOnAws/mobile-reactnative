import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { OrderParamList } from "../types";
import TumpangOrderScreen from '../screens/tumpang/TumpangOrderScreen';

const OrderStack = createStackNavigator<OrderParamList>();

const TumpangNavigator = () => {
    return (
        <OrderStack.Navigator screenOptions={{ headerShown: false }}>
            <OrderStack.Screen name="OrderScreen" component={TumpangOrderScreen} />
        </OrderStack.Navigator>
    )
}
export default TumpangNavigator