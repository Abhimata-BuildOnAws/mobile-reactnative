/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  UserManagement: undefined;
  Home: undefined;
  NotFound: undefined;
  Tumpang: undefined;
  Order: undefined;
  Payment: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type TumpangParamList = {
  TumpangOrderScreen: undefined;
}

export type UserManagementParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
}

export type PaymentStackParamList = {
  Payment: undefined;
}