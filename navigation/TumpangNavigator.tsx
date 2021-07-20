import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TumpangOrderScreen from "../screens/tumpang/TumpangOrderScreen";
import { TumpangParamList } from "../types";
import RestaurantNavigator from "./RestaurantNavigator"

const TumpangStack = createStackNavigator<TumpangParamList>();

// Tumpang Navigator
const TumpangNavigator = () => {
    return (
        <TumpangStack.Navigator screenOptions={{ headerShown: false }}>
            <TumpangStack.Screen name="TumpangOrderScreen" component={TumpangOrderScreen} />
            <TumpangStack.Screen name="RestaurantNavigator" component={RestaurantNavigator} />
        </TumpangStack.Navigator>
    )
}
export default TumpangNavigator