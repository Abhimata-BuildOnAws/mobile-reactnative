import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantScreen from "../screens/restaurant/RestaurantScreen";
import { RestaurantStackParamList } from "../types";

const RestaurantStack = createStackNavigator<RestaurantStackParamList>();

// Tumpang Navigator
const RestaurantNavigator = () => {
    return (
        <RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
            <RestaurantStack.Screen name="RestaurantScreen" component={RestaurantScreen} />
        </RestaurantStack.Navigator>
    )
}
export default RestaurantNavigator