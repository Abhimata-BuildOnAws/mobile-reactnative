import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TumpangOrderScreen from "../screens/tumpang/TumpangOrderScreen";
import { TumpangParamList } from "../types";

const TumpangStack = createStackNavigator<TumpangParamList>();

const TumpangNavigator = () => {
    return (
        <TumpangStack.Navigator screenOptions={{ headerShown: false }}>
            <TumpangStack.Screen name="TumpangOrderScreen" component={TumpangOrderScreen} />
        </TumpangStack.Navigator>
    )
}
export default TumpangNavigator