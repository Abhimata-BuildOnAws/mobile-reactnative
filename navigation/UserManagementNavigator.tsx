import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { UserManagementParamList } from "../types";
import OrderScreen from '../screens/order/OrderScreen';
import Login from '../screens/user-management/Login';
import SignUp from '../screens/user-management/SignUp';

const UserManagementStack = createStackNavigator<UserManagementParamList>();

const UserManagementNavigator = () => {
    return (
        <UserManagementStack.Navigator>
            <UserManagementStack.Screen name="LoginScreen" component={Login} />
            <UserManagementStack.Screen name="SignUpScreen" component={SignUp} />
        </UserManagementStack.Navigator>
    )
}
export default UserManagementNavigator