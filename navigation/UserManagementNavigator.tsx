import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { UserManagementParamList } from "../types";
import OrderScreen from '../screens/order/OrderScreen';
import Login from '../screens/user-management/Login';

const UserManagementStack = createStackNavigator<UserManagementParamList>();

const UserManagementNavigator = () => {
    return (
        <UserManagementStack.Navigator screenOptions={{ headerShown: false }}>
            <UserManagementStack.Screen name="LoginScreen" component={Login} />
        </UserManagementStack.Navigator>
    )
}
export default UserManagementNavigator