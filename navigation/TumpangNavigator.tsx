import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TumpangOrderScreen from "../screens/tumpang/TumpangOrderScreen";
import { OrderParamList } from "../types";

const TumpangStack = createStackNavigator<OrderParamList>();

const TumpangNavigator = () => {
    return (
        <TumpangStack.Navigator screenOptions={{ headerShown: false }}>
            <TumpangStack.Screen name="OrderScreen" component={TumpangOrderScreen} />
        </TumpangStack.Navigator>
    )
}
export default TumpangNavigator