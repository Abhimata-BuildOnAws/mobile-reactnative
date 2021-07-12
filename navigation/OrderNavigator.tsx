import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { OrderParamList } from "../types";
import OrderScreen from '../screens/order/OrderScreen';

const OrderStack = createStackNavigator<OrderParamList>();

const TumpangNavigator = () => {
    return (
        <OrderStack.Navigator screenOptions={{ headerShown: false }}>
            <OrderStack.Screen name="OrderScreen" component={OrderScreen} />
        </OrderStack.Navigator>
    )
}
export default TumpangNavigator